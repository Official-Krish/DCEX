import { ArrowLeft, ArrowRight, Layers2, Mail, Wand } from "lucide-react"
import { useEffect, useState } from "react"
import AssetSelector from "./AssetSelector";
import { SUPPORTED_TOKENS } from "@/lib/tokens";
import { useTokens } from "@/app/api/hooks/useTokens";
import ConfirmButton from "./Buttons/ConfirmButton";
import axios from "axios";
import { useDebounce } from "@/app/api/hooks/useDebounce";

type sendOptions = "link" | "email" | "address";

export default function Send({ publicKey, onclose }: { publicKey: string, onclose: () => void }) {
    const { tokenBalances, loading } = useTokens(publicKey);
    const [steps, setSteps] = useState(0);
    const [sendOption, setSendOption] = useState<sendOptions>();

    return (
        <div className="bg-gray-50 py-6 w-full h-full border border-slate-200 rounded-lg shadow-lg">
            <div className="px-8 py-4 h-full">
                {steps === 0 && 
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-600">Send</h1>
                        <h2 className="text-sm font-normal text-slate-500 py-2">Send funds by creating a new Account</h2>
                        <div className="mt-2">
                            <SendOptions
                                icon={<Wand className="h-6 w-6" />} 
                                title="Ask a Link or QR"
                                description="Create a new Account and share via a simple link or QR code."
                                topBorderEnabled={true}
                                bottomBorderEnabled={false}
                                onclick={() => {
                                    setSendOption("link");
                                    setSteps(1);
                                }}  
                            />
                        </div>
                        <div>
                            <SendOptions
                                icon={<Mail className="h-6 w-6" />} 
                                title="To Email"
                                description="Create a new Account and send to a person via their email address."
                                topBorderEnabled={false}
                                bottomBorderEnabled={true}
                                onclick={() => {
                                    setSendOption("email");
                                    setSteps(1);
                                }}
                            />
                        </div>

                        <h2 className="text-sm font-normal text-slate-500 py-2">or send to an existing wallet:</h2>
                        <div className="mt-2">
                            <SendOptions
                                icon={<Layers2 className="h-6 w-6" />} 
                                title="To Solana Wallet Address"
                                description="Send funds to a Solana address you specify."
                                topBorderEnabled={false}
                                bottomBorderEnabled={true}
                                onclick={() => {
                                    setSendOption("address");
                                    setSteps(1);
                                }}
                            />
                        </div>
                        
                        <div className="mt-4">
                            <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={() => onclose()}>Cancel</button>
                        </div>
                    </div>
                }


                {steps === 1 && 
                    <div>
                        {sendOption === "link" && <div>Link</div>}
                        {sendOption === "email" && <SendToAddress
                            title="Send to Email"
                            description="Send funds to an email you specify:"
                            onclose={() => setSteps(0)} 
                            tokenBalances={tokenBalances}
                            Recieptant_Option="Recipient's Email"
                            sendVia={sendOption}
                        />}
                        {sendOption === "address" && <SendToAddress
                            title="Send to Solana Wallet Address "
                            description="Send funds to a Solana wallet address you specify."
                            onclose={() => setSteps(0)} 
                            tokenBalances={tokenBalances}
                            Recieptant_Option="Recipient's Solana Address"
                            sendVia="address"
                        />}
                    </div>
                }
            </div>
        </div>
    )
}

export function SendOptions({ icon, title, description, topBorderEnabled, bottomBorderEnabled, onclick }: { 
    icon: React.ReactNode, 
    title: string, 
    description: string, 
    topBorderEnabled?: boolean, 
    bottomBorderEnabled?: boolean,
    onclick?: () => void 
}) {
    return (
        <div className={`w-full h-20 border border-slate-200 rounded-xl bg-white cursor-pointer ${topBorderEnabled ? "rounded-b-lg" : ""} ${bottomBorderEnabled ? "rounded-t-lg" : ""}`} onClick={onclick}>
            <div className="flex justify-between items-center px-4 py-4">
                <div className="flex items-center">
                    {icon}
                    <div className="ml-3">
                        <h1 className="text-lg font-semibold text-slate-700">{title}</h1>
                        <p className="text-sm text-slate-400">{description}</p>
                    </div>
                </div>
                <ArrowRight className="h-6 w-6 text-slate-500" />
            </div>
        </div>
    )
}

export function SendToAddress ({ onclose, tokenBalances, Recieptant_Option, sendVia, title, description }: { 
    onclose: () => void, 
    tokenBalances: any, 
    Recieptant_Option: string, 
    sendVia: string,
    title: string,
    description: string
}) {
    const [asset, setAsset] = useState(SUPPORTED_TOKENS[0]);
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [estimatedAmount, setEstimatedAmount] = useState("0");


    const getQuote = async () => {
        const inputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
        const outputMint = "So11111111111111111111111111111111111111112";
        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            return;
        }
        const quoteAmount = Number(amount) * 1000000;

        try {
            const response = await axios.get(
                `/api/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${quoteAmount}` 
            );
            setEstimatedAmount((Number(response.data.data.outAmount) / Number(10 ** 9)).toString());
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedGetQuote = useDebounce(getQuote, 1000);

    useEffect(() => {
        debouncedGetQuote();
    }, [Number(amount) > 0 ]);

    const sendSOL = async () => {
        console.log("Sending", recipient, amount, sendVia);
        if (!recipient || !amount) return;
        try {
            const response = await axios.post(`/api/send?sendOption=${sendVia}`, {
                recipientAddress: recipient,
                amount: amount,
            });
            if (response.data.signature) {
                alert("Transaction sent!");
            }
        } catch(e) {
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
                Account available SOL: {<span className="font-semibold ml-1">{tokenBalances?.tokens.find((x: any) => x.name === asset.name)?.balance} {asset.name}</span>}
            </div>

            <div className="py-2">
                <div className="py-2 flex justify-center">
                    <div className="flex items-center w-full px-4 py-4 rounded-2xl border border-gray-300 bg-white shadow-sm justify-between">
                        <div className="flex items-center w-full justify-center">
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="$0 USD"
                                className="text-gray-700 text-3xl bg-transparent focus:outline-none text-center flex w-full ml-14" 
                            />
                            {amount !== "" && <div className="text-gray-700 text-3xl">USD</div>}
                        </div>
                        <div className="flex gap-2 ml-3">
                            <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">Max</button>
                            <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">↕</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pb-2">
                <span className="text-slate-400 text-sm font-semibold">~ {estimatedAmount} {asset.name}</span>
            </div>


            <div className="flex justify-center">
                <div className="flex items-center w-full px-4 py-2 rounded-2xl border border-gray-300 bg-white shadow-sm justify-between">
                    <div className="items-center w-full justify-center">
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder={`${Recieptant_Option}`}
                            className="text-gray-700 text-lg bg-transparent focus:outline-none text-center flex w-full" 
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between px-6 py-3 ">
                <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={() => onclose()}>Cancel</button>
                <ConfirmButton onClick={() => sendSOL()} loading={(!amount || !recipient || !asset) ? "opacity-50 cursor-not-allowed" : ""}>
                    Confirm & Send
                </ConfirmButton>
            </div>
        </div>
    )
}