import SideNav from '@/app/dashboard/sidenav';
import Footer from '@/app/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex flex-col flex-grow md:overflow-y-auto">
        <div className="flex-grow p-6 md:p-12">{children}</div>
        <div className="px-6 md:px-12 pb-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
