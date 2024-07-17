import { LandingContent } from "@/components/LandingContent";
import { LandingHero } from "@/components/LandingHero";
import { LandingNavbar } from "@/components/LandingNavbar";

export default function Landing() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
