"use state"
import { Check, Copy, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function UserInfo({publicKey}: {publicKey: string}) {
    const { data: session } = useSession();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }
    return <div>
        <div className="flex items-center py-6 px-6">
            {session?.user?.image ? (
                <Image 
                    src={session.user.image} 
                    alt="User Profile" 
                    width={70} 
                    height={70} 
                    className="rounded-full"
                />
            ) : (
                <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">N/A</span>
                </div>
            )}
            <div className="ml-3">
                <h1 className="text-2xl font-bold text-slate-600">
                    Welcome back, {session?.user?.name ?? "Guest"}!
                </h1>
            </div>
        </div>

        <div className="px-6 flex">
            <Wallet className="w-5 h-5 mr-1 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-400">TipLink Account Assets</h2>
        </div>

        <div className="px-6 flex py-3 items-center justify-between">
            <div className="flex">
                <h1 className="text-7xl font-bold">$0.00</h1>
                <h2 className="text-4xl text-slate-500 font-bold ml-1 flex items-end">USD</h2>
            </div>
            <button className={`${!copied ? "flex items-center px-4 py-2 bg-slate-200 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-300": "flex items-center px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-slate-100 hover:bg-slate-700"}`}
                onClick={() => handleCopy()}
            >
                {copied ? (
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-slate-100 mr-1" />
                        <span> Copied</span>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Copy className="w-5 h-5 text-slate-400 mr-1" />
                        <span> Your Wallet Address</span>
                    </div>
                )}
            </button>
        </div>
    </div>
}