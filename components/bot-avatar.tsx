import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-12 w-12 ">
      <AvatarImage className="" src="/logo.png" />
    </Avatar>
  );
};
