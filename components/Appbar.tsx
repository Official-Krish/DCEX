"use client";
import { signIn, useSession } from "next-auth/react";
import { Coins } from "lucide-react";
import Google from "./ui/Google";
import { UserDropdown } from "./DropDown";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <nav className="container mx-auto px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-lg z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer" onClick={() => router.push("/")}>
            <Coins className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CryptoVeda</span>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">How it Works</a>
            <a href="#tokens" className="hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform">Tokens</a>
          </div>
          {!session.data?.user && <button onClick={() => signIn("google")} className="flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-normal text-lg hover:bg-blue-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl">
              <Google width="30" height="30"/>
              <span className="ml-2">
                Google Login
              </span>
            </button>
          }

          {session.data?.user && <UserDropdown/>}

        </div>
      </nav>
    </div>
  );
}