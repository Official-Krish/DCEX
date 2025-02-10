"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Coins } from "lucide-react";
export default function Appbar() {
  const session = useSession();

  return (
    <div>
      <nav className="container mx-auto px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-lg z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <Coins className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CryptoVeda</span>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">How it Works</a>
            <a href="#tokens" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">Tokens</a>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 transform">
            Launch App
          </button>
        </div>
      </nav>
    </div>
  );
}