import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

// 1. Sesuaikan tipe data agar mencocokkan password_hash dari database
type User = {
  id?: string;
  name?: string | null;
  email: string;
  password_hash: string; // Diubah dari 'password' ke 'password_hash'
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const dbInfo = await sql`SELECT current_database(), current_user`;
    console.log('[AUTH DB INFO] Database terhubung:', dbInfo.rows[0]);
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) {
            console.log(`[AUTH] User dengan email "${email}" tidak ditemukan di tabel users.`);
            return null;
          }
          
          const userPassword = user.password_hash || (user as any).password;
          if (!userPassword) {
            console.log(`[AUTH] Nilai password/password_hash kosong di database untuk email "${email}".`);
            return null;
          }

          let passwordsMatch = false;
          if (typeof userPassword === 'string' && userPassword.startsWith('$2')) {
            passwordsMatch = await bcrypt.compare(password, userPassword);
          } else {
            // Fallback jika di database tersimpan password plain text (belum di-hash bcrypt)
            passwordsMatch = password === userPassword;
          }

          if (passwordsMatch) {
            console.log(`[AUTH] Login berhasil untuk: ${email}`);
            return user;
          }

          console.log(`[AUTH] Password salah untuk email "${email}".`);
        } else {
          console.log('[AUTH] Validasi input gagal: pastikan format email benar dan password minimal 6 karakter.');
        }

        return null;
      },
    }),
  ],
});