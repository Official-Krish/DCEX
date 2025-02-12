"use client";
import { signIn, useSession } from "next-auth/react";
import { Coins, WalletIcon } from "lucide-react";
import Google from "./ui/Google";
import { UserDropdown } from "./DropDown";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";


export default function Appbar() {
  const session = useSession();
  const router = useRouter();
  const { connected } = useWallet();

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

          {session.data?.user && <div className="flex items-center space-x-4">
            {!connected ? (
              <WalletMultiButton>
                <WalletIcon className="h-8 w-8" />
              </WalletMultiButton>
              ):
              <DropDown/>
            }
            <UserDropdown/>
          </div>}

        </div>
      </nav>
    </div>
  );
}



export const DropDown = () => {
  const { wallet, disconnect, select, wallets } = useWallet();
  const publicKey = wallet?.adapter.publicKey?.toBase58() || "";
  const [copied, setCopied] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex bg-gray-800 hover:bg-gray-700 cursor-pointer py-2 px-4 rounded-lg items-center text-slate-100 opacity-90">
          <Image 
            src={wallet?.adapter.icon || ""}
            alt="Avatar"
            width={20}
            height={20}
            className="rounded-full mr-2"
          />
          {(wallet?.adapter.publicKey?.toString().slice(0,4).concat("...") || "")}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] bg-gray-800 border-gray-600 items-center">
          <DropdownMenuItem className="text-white cursor-pointer" onClick={handleCopy}>
            {copied ? (
              <div className="flex items-center">
                <span>Copied</span>
              </div>
            ) : (
              <a className="flex items-center gap-2">
                <span>Copy Address</span>
              </a>
            )}
          </DropdownMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-white cursor-pointer" onSelect={(e) => {
                e.preventDefault();
                setShowWallets(true);
              }}>
                <span className="flex items-center gap-2">Change Wallet</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </Dialog>
          <DropdownMenuItem className="text-white cursor-pointer">
            <button onClick={() => disconnect()} className="flex items-center gap-2">
              Disconnect
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showWallets} onOpenChange={setShowWallets}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Select a Wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4 outline-none">
            {wallets.map((wlt) => (
              <button
                key={wlt.adapter.name}
                className={`w-full px-4 py-2 rounded-lg text-left hover:bg-gray-700 flex items-center gap-2 outline-none
                  ${wallet?.adapter.name === wlt.adapter.name ? 'bg-gray-700' : ''}`}
                onClick={() => {
                  select(wlt.adapter.name);
                  setShowWallets(false);
                }}
              >
                {wlt.adapter.icon && (
                  <Image
                    src={wlt.adapter.icon}
                    alt={wlt.adapter.name}
                    width={20}
                    height={20}
                  />
                )}
                {wlt.adapter.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};