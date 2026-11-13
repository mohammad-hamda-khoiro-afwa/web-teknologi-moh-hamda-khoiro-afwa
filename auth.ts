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
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
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
          if (!user) return null;
          
          // 2. Gunakan user.password_hash untuk dicocokkan dengan input password
          const passwordsMatch = await bcrypt.compare(password, user.password_hash);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});