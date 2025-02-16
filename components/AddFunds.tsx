"use client";
require('dotenv').config();
import { useState } from "react";
import { SendOptions } from "./Send";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet2 } from "lucide-react";
import AssetSelector from "./AssetSelector";
import { SUPPORTED_TOKENS } from "@/lib/tokens";
import { useTokens } from "@/app/api/hooks/useTokens";
import ConfirmButton from "./Buttons/ConfirmButton";
import { CopyAlertDialog } from "./CopyAlertBox";
import Image from "next/image";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function AddFunds({ onclose, publicKey }: { onclose: () => void, publicKey: string }) {
    const { wallet, connected } = useWallet();
    const [steps, setSteps] = useState(0);
    return (
        <div className="bg-gray-50 py-6 w-full h-full border border-slate-200 rounded-lg shadow-lg">
            <div className="px-8 py-4 h-full">
                <div>
                    {(steps === 0 || steps === 1) &&
                        <h1 className="text-3xl font-semibold text-slate-600">Add Funds</h1>
                    }
                    <div className="mt-2">
                        {connected && steps === 0 && 
                            <div>
                                <SendOptions
                                    icon={<Wallet2 className="h-6 w-6" />} 
                                    title="From External Account/Wallet"
                                    description="Deposit Asset from your connected wallet."
                                    topBorderEnabled={true}
                                    bottomBorderEnabled={false}
                                    onclick={() => {
                                        setSteps(1);
                                    }}  
                                />
                                <CopyAlertDialog publicKey={publicKey} 
                                    DialogTrigger={
                                        <SendOptions
                                            icon={<Wallet2 className="h-6 w-6" />} 
                                            title="To this Solana Wallet Address"
                                            description="Deposit Asset via this Solana wallet address."
                                            topBorderEnabled={false}
                                            bottomBorderEnabled={true} 
                                        />
                                    }
                                />
                            </div>
                        }
                        {!connected &&
                            <div className="text-red-500 flex justify-center">
                                Please Connect your wallet to Add funds
                            </div>
                        }

                        {steps === 1 &&
                            <SendOptions
                                icon={<Image src={wallet?.adapter.icon!} alt="Wallet Icon" width={30} height={30} className="rounded-full mr-2" />}
                                title="Connected Wallet"
                                description="Deposit Asset from your connected wallet."
                                topBorderEnabled={true}
                                bottomBorderEnabled={true}
                                onclick={() => {
                                    setSteps(2);
                                }}  
                            />
                        }
                    </div>
                    {(steps == 0 || steps === 1) &&  
                        <div className="mt-4">
                            <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={() => onclose()}>Cancel</button>
                        </div>
                    }
                </div>

                {steps === 2 && 
                    <div>
                        {<ADDSOL
                            title="Deposit via connected wallet"
                            description="Specify asset and amount:"
                            onclose={() => setSteps(0)} 
                            publicKey={publicKey}
                            WalletPublicKey={wallet?.adapter.publicKey?.toBase58() || ""}
                        />}
                    </div>
                }
            </div>
        </div>
    )
}

function ADDSOL ({ onclose, publicKey, title, description, WalletPublicKey }: { onclose: () => void, publicKey: string, title: string, description: string, WalletPublicKey: string }) {
    const [asset, setAsset] = useState(SUPPORTED_TOKENS[0]);
    const [amount, setAmount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { tokenBalances } = useTokens(publicKey);
    const { wallet } = useWallet();
    const endpoint = process.env.NEXT_PUBLIC_SOLANA_CONNECTION_URL;
    const connection = new Connection(endpoint!);

    const handleMaxAmount = () => {
        const balance = tokenBalances?.tokens.find((x) => x.name === asset.name)?.balance;
        if (balance) {
            // Leave some SOL for transaction fees
            const maxAmount = Math.max(0, Number(balance) - 0.01);
            setAmount(maxAmount.toString());
        }
    };

    const AddSol = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!wallet || !wallet.adapter.publicKey) {
                throw new Error("Wallet not connected");
            }

            const transaction = new Transaction();
            transaction.add(SystemProgram.transfer({
                fromPubkey: new PublicKey(WalletPublicKey),
                toPubkey: new PublicKey(publicKey),
                lamports: Number(amount) * LAMPORTS_PER_SOL,
            }));
    
            const latestBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = latestBlockhash.blockhash;
            transaction.feePayer = wallet.adapter.publicKey;

            // Sign and send the transaction
            const signature = await wallet.adapter.sendTransaction(transaction, connection);
            
            // Wait for confirmation
            const confirmation = await connection.confirmTransaction(signature);
            
            if (confirmation.value.err) {
                throw new Error("Transaction failed to confirm");
            }
            onclose();
        } catch (error) {
            console.error("Error sending SOL:", error);
            setError(error instanceof Error ? error.message : "Failed to send SOL");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full">
            <h1 className="text-3xl font-semibold text-slate-700 py-3">{title}</h1>
            <h2 className="text-sm font-normal text-slate-500">{description}</h2>

            <div className="w-full py-4">
                {<AssetSelector onSelect={(asset) => setAsset(asset)} selectedToken={SUPPORTED_TOKENS[0]}/>}
            </div>
            <div className="flex justify-center font-sm text-slate-500 text-sm">
                Account available SOL: {<span className="font-semibold ml-1">{tokenBalances?.tokens.find((x) => x.name === asset.name)?.balance} {asset.name}</span>}
            </div>

            <div className="py-2">
                <div className="py-2 flex justify-center">
                    <div className="flex items-center w-full px-4 py-4 rounded-2xl border border-gray-300 bg-white shadow-sm justify-between">
                        <div className="flex items-center w-full justify-center">
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    setError(null);
                                    setAmount(e.target.value.replace(/[^0-9.]/g, ''));
                                }}
                                placeholder="0 SOL"
                                className="text-gray-700 text-3xl bg-transparent focus:outline-none text-center flex w-full ml-14" 
                            />
                            {amount !== "" && <div className="text-gray-700 text-3xl">SOL</div>}
                        </div>
                        <div className="flex gap-2 ml-3">
                            <button 
                                onClick={handleMaxAmount}
                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200"
                            >
                                Max
                            </button>
                            <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200">↕</button>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm text-center mt-2">
                    {error}
                </div>
            )}

            {isLoading && (
                <div className="text-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}

            <div className="mt-8 flex justify-between px-6 py-3">
                <button 
                    className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100"
                    onClick={() => onclose()}
                >
                    Cancel
                </button>
                <ConfirmButton onClick={() => AddSol()} loading={(!amount || !asset) ? "opacity-50 cursor-not-allowed" : ""}>
                    Confirm & Send
                </ConfirmButton>
            </div>
        </div>
    )
}