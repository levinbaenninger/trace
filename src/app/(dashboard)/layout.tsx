import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
