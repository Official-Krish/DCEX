import Features from "./Home/Features";
import Hero from "./Home/Hero";
import Pitch from "./Home/Pitch";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Pitch />
      <Features/>
    </div>
  );
}