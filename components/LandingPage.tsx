import Benefits from "./Home/Benefits";
import CTA from "./Home/CTA";
import Features from "./Home/Features";
import Hero from "./Home/Hero";
import Pitch from "./Home/Pitch";
import Security from "./Home/Security";
import StepsToStart from "./Home/StepsToStart";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Pitch />
      <Features/>
      <StepsToStart/>
      <Benefits/>
      <Security />
      <CTA />
    </div>
  );
}