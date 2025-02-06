"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
export default function Appbar() {
  const session = useSession();

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 py-2 bg-white shadow-md">
      <div>
        <span className="text-xl font-bold ml-2">DCEX</span>
      </div>
      <div className="flex items-center px-3 space-x-4">
        <a href="#" className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Account settings</a>
        <a href="#" className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Support</a>
        <a href="#" className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">License</a>
        
        {session.data?.user ? <Button onClick={() => signOut()}>Sign out</Button> : <Button onClick={() => signIn("google")}>Sign in</Button>}
      </div>
    </div>
  );
}