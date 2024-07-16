import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="h-full md:inset-y-0 bg-gray-900 md:z-[80]  md:w-72 hidden md:fixed md:flex md:flex-col">
        <SideBar />
      </div>
      <main className=" w-full md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default dashboardLayout;
