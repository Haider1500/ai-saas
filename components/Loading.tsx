import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full flex flex-col items-center gap-y-4">
      <div className="w-10 h-10 relative animate-spin">
        <Image fill alt="logo" src={"/logo.png"} />
      </div>
      <p>Marvel is thinking...</p>
    </div>
  );
};
