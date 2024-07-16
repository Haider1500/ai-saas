import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 ">
      <MobileSideBar />
      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;