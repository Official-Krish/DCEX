"use client";
import { useSession } from "next-auth/react";
import Benefits from "./Home/Benefits";
import CTA from "./Home/CTA";
import Features from "./Home/Features";
import Hero from "./Home/Hero";
import Pitch from "./Home/Pitch";
import Security from "./Home/Security";
import StepsToStart from "./Home/StepsToStart";
import { useRouter } from "next/navigation";

export default function LandingPage() {

  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push("/dashboard");
  }

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