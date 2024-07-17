const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto bg-[#111827] ">
      <div className="mx-auto mx-w-screen-xl h-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
