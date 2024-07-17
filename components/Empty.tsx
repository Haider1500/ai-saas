import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex flex-col h-full p-20  items-center justify-center">
      <div className="relative h-72 w-72">
        <Image fill alt="Empty" src={"/empty.png"} />
      </div>
      <p className="text-sm text-center text-muted-foreground">{label}</p>
    </div>
  );
};
