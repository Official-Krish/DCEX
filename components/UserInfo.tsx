"use state"
import { useTokens } from "@/app/api/hooks/useTokens";
import { Check, Copy, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import QRCode from 'qrcode'

export default function UserInfo({publicKey}: {publicKey: string}) {
    const { data: session } = useSession();

    const { tokenBalances, loading } = useTokens(publicKey);

    if (loading) {
        return <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }

    return <div>
        <div className={`flex items-center py-6 px-6`}> 
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
                <h1 className="text-7xl font-bold">{tokenBalances?.totalBalance}</h1>
                <h2 className="text-4xl text-slate-500 font-bold ml-1 flex items-end">USD</h2>
            </div>

            <CopyAlertDialog publicKey={publicKey} />
        </div>
    </div>
}


function CopyAlertDialog({ publicKey }: { publicKey: string }) {
    const [copied, setCopied] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        const generateQR = async (publicKey: string) => {
            try {
                const qr = await QRCode.toDataURL(publicKey);
                setData(qr);
            } catch (err) {
              console.error(err)
            }
          }
          generateQR(publicKey)
    }, [publicKey])

    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className={`"flex items-center px-4 py-2 bg-slate-200 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-300"`}
                    >
                        <div className="flex items-center">
                            <Copy className="w-5 h-5 text-slate-400 mr-1" />
                            <span> Your Wallet Address</span>
                        </div>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogContent>
                    <div className="flex items-center justify-center text-center">
                        <div className="pt-4">
                            <h1 className="text-2xl font-bold text-slate-800">Your Wallet Address</h1>
                            <h2 className="text-lg font-normal text-slate-700 pt-2">You can deposit crypto or NFTs into your account via this Solana wallet address:</h2>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="bg-blue-50 rounded-lg h-[420px] w-[450px]">
                            <div className="relative h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Image src={data} alt="QR Code" className="w-60 h-60 rounded-xl" width={300} height={300} />
                                    <div className="px-4 py-6">
                                        <button className="p-3 flex bg-white h-14 w-full rounded-full items-center" onClick={() => handleCopy()}>
                                            <input type="text" value={publicKey.slice(0, 4) + "..." + publicKey.slice(-4)} readOnly= {true} className="w-full rounded-3xl flex items-center justify-center text-center h-14 text-md outline-0 border-none bg-transparent" />
                                            <div className="rounded-full bg-blue-500 text-white h-10 w-12 flex items-center justify-center">
                                                {!copied && <Copy className="w-4 h-4" />}
                                                {copied && <Check className="w-6 h-6" />}
                                            </div>
                                        </button>
                                    </div>

                                    <div className="text-sm text-slate-500 font-normal">
                                        Only send crypto to this address via the Solana network.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button 
                            className="flex items-center px-10 py-3 rounded-lg text-xs font-bold border hover:bg-slate-100"
                            onClick={() => window.location.href = `https://solscan.io/account/${publicKey}`}
                        >
                            <div className="flex items-center">
                                <Image
                                    src="https://tiplink.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsolscan.0297f978.png&w=640&q=75"
                                    alt="SolScan"
                                    width={20}
                                    height={20}
                                    className="rounded-full mr-2"
                                />
                                <span className="font-normal text-lg"> View on SolScan</span>
                            </div>
                        </button>
                        <div className="flex items-center">
                            <AlertDialogCancel className="px-20 py-6 rounded-lg" >
                                Done
                            </AlertDialogCancel>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}