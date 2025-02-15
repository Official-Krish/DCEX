"use client";
import { useState } from "react";
import { SendOptions } from "./Send";
import { useWallet } from "@solana/wallet-adapter-react";
import { ArrowLeft, Wallet2 } from "lucide-react";
import AssetSelector from "./AssetSelector";
import { SUPPORTED_TOKENS } from "@/lib/tokens";
import { useTokens } from "@/app/api/hooks/useTokens";
import ConfirmButton from "./Buttons/ConfirmButton";
import axios from "axios";

export default function Withdraw({ onclose, publicKey }: { onclose: () => void, publicKey: string }) {
    const { wallet, connected } = useWallet();
    const [steps, setSteps] = useState(0);
    return (
        <div className="bg-gray-50 py-6 w-full h-full border border-slate-200 rounded-lg shadow-lg">
            <div className="px-8 py-4 h-full">
                {steps === 0 && 
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-600">Withdraw</h1>
                        <h2 className="text-sm font-normal text-slate-500 py-2">Withdraw funds by creating a new Account</h2>
                        <div className="mt-2">
                            {connected && 
                            <SendOptions
                                icon={<Wallet2 className="h-6 w-6" />} 
                                title="To Your Connected Wallet"
                                description="Withdraw funds to your connected wallet."
                                topBorderEnabled={true}
                                bottomBorderEnabled={true}
                                onclick={() => {
                                    setSteps(1);
                                }}  
                            />}
                            {!connected &&
                                <div className="text-red-500 flex justify-center">
                                    Please Connect your wallet to withdraw funds
                                </div>
                            }
                        </div>
                        <div className="mt-4">
                            <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={() => onclose()}>Cancel</button>
                        </div>
                    </div>
                }


                {steps === 1 && 
                    <div>
                        {<WithdrawSOL
                            title="Send to Solana Wallet Address "
                            description="Send funds to a Solana wallet address you specify."
                            onclose={() => setSteps(0)} 
                            publicKey={publicKey}
                            recipientPublicKey={wallet?.adapter.publicKey?.toBase58() || ""}
                        />}
                    </div>
                }
            </div>
        </div>
    )
}

function WithdrawSOL ({ onclose, publicKey, title, description, recipientPublicKey }: { onclose: () => void, publicKey: string, title: string, description: string, recipientPublicKey: string }) {
    const [asset, setAsset] = useState(SUPPORTED_TOKENS[0]);
    const [amount, setAmount] = useState("");
    const { tokenBalances } = useTokens(publicKey);

    const withdraw = async () => {
        try{
            const response = await axios.post(`/api/withdraw`, {
                recipientAddress: recipientPublicKey,
                amount: amount,
            });
            if (response.data.signature) {
                alert("Transaction sent!");
            } else {
                alert("Transaction failed!");
            }
        } catch(e) {
            console.error(e);
            alert("Transaction failed!");
        }
    }

    return (
        <div className="h-full">
            <button className="flex text-slate-500 font-semibold items-center" onClick={() => onclose()}>{<ArrowLeft className="w-4 h-4 mr-1"/>}
                Back
            </button>
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
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0 SOL"
                                className="text-gray-700 text-3xl bg-transparent focus:outline-none text-center flex w-full ml-14" 
                            />
                            {amount !== "" && <div className="text-gray-700 text-3xl">SOL</div>}
                        </div>
                        <div className="flex gap-2 ml-3">
                            <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">Max</button>
                            <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">↕</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white shadow-sm">
                <div className="flex flex-col text-center w-full">
                    <span className="text-gray-500 text-lg"><span className="text-gray-700 font-bold">Reciepient Address:</span> {recipientPublicKey}</span>
                </div>
            </div>

            <div className="mt-8 flex justify-between px-6 py-3 ">
                <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={() => onclose()}>Cancel</button>
                <ConfirmButton onClick={() => withdraw()} loading={(!amount || !asset) ? "opacity-50 cursor-not-allowed" : ""}>
                    Confirm & Send
                </ConfirmButton>
            </div>
        </div>
    )
}