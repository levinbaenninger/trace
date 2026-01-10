import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
