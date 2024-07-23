import Navbar from "@/components/Navbar";
import SideBar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const dashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="h-full md:inset-y-0 bg-gray-900  md:w-72 hidden md:fixed md:flex md:flex-col">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className=" w-full md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default dashboardLayout;
