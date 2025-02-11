import { useTokens } from "@/app/api/hooks/useTokens";
import { SUPPORTED_TOKENS, TokenDetails } from "@/lib/tokens";
import { ArrowUpDown, Check, Loader2, MoveLeft } from "lucide-react"
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";
import { useDebounce } from "@/app/api/hooks/useDebounce";
import ConfirmButton from "./Buttons/ConfirmButton";

export default function Swap({ publicKey, onClose }: { publicKey: string, onClose: () => void }) {
    const { tokenBalances, loading } = useTokens(publicKey);
    const [ baseAsset, setBaseAsset ] = useState(SUPPORTED_TOKENS[0]);
    const [ baseAmount, setBaseAmount ] = useState<string>();
    const [ quoteAsset, setQuoteAsset ] = useState(SUPPORTED_TOKENS[1]);
    const [quoteAmount, setQuoteAmount] = useState<string>();
    const [fetchingQuote, setFetchingQuote] = useState(false);
    const [quoteResponse, setQuoteResponse] = useState(null);
    
    const getQuote = async () => {
        if (!baseAsset || !baseAmount || !quoteAsset) return;
        
        setFetchingQuote(true);
        try {
            const response = await axios.get(
                `/api/quote?inputMint=${baseAsset.mint}&outputMint=${quoteAsset.mint}&amount=${Number(baseAmount) * (10 ** baseAsset.decimals)}`
            );
            setQuoteAmount((Number(response.data.data.outAmount) / Number(10 ** quoteAsset.decimals)).toString());
            setQuoteResponse(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setFetchingQuote(false);
        }
    };

    const debouncedGetQuote = useDebounce(getQuote, 500);

    useEffect(() => {
        debouncedGetQuote();
    }, [baseAsset, baseAmount, quoteAsset]);


    const SwapButton = async () => {
        try {
            const response = await axios.post(`/api/swap`, {
                quoteResponse: quoteResponse,
            });
            if (response.data.txnId) {
                alert("Swap done!");
            }
        } catch(e) {
            console.log(e);
        }
    }

    if (loading) return <div className="flex justify-center items-center">{<Loader2 className="animate-spin h-8 w-8" />}</div>

    return <div className="bg-slate-100 py-6 w-full h-full border-l-1 border-r-1 border-b-1 border-slate-200 rounded-lg shadow-lg">
        <div className="flex px-6 text-slate-700 cursor-pointer hover:text-slate-500">
            <div className="flex items-center cursor-pointer" onClick={onClose}>
                <MoveLeft className="w-4 h-4 mr-1" />
                <h2 className="text-sm font-bold">Back</h2>
            </div>
        </div>

        <div className="px-6 py-3">
            <h1 className="text-3xl font-semibold text-slate-600">Swap Tokens</h1>
        </div>

        <div className="px-6 py-3">
            <SwapInputRow 
                title="You Pay:"
                onSelect={(asset) => setBaseAsset(asset)}
                selectedToken={baseAsset}
                amount={baseAmount} 
                onAmountChange={(value: string) => {
                    setBaseAmount(value);
                }}
                Subtitle={<div className="text-slate-500 pt-2 text-sm pl-1 flex">
                    <div className="font-normal pr-1">
                        Current Balance:
                    </div>
                    <div className="font-semibold">
                        {tokenBalances?.tokens.find(x => x.name === baseAsset.name)?.balance} {baseAsset.name}
                    </div>
                </div>}  
                bottomBorderEnabled={false}
                topBorderEnabled={true}  
            />
            <div className="flex justify-center">
                <div onClick={() => {
                    let baseAssetTemp = baseAsset;
                    setBaseAsset(quoteAsset);
                    setQuoteAsset(baseAssetTemp);
                }} className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center pt-2">
                    <ArrowUpDown className="w-5 h-5 text-slate-500" />
                </div>
            </div>

            <SwapInputRow 
                inputLoading={fetchingQuote} 
                inputDisabled={true} 
                amount={quoteAmount} 
                onSelect={(asset) => {
                    setQuoteAsset(asset)
                }} 
                selectedToken={quoteAsset} 
                title={"You receive"}  
                topBorderEnabled={false} 
                bottomBorderEnabled={true}  
                Subtitle={<div className="text-slate-500 pt-2 text-sm pl-1 flex">
                    <div className="font-normal pr-1">
                        Current Balance:
                    </div>
                    <div className="font-semibold">
                        {tokenBalances?.tokens.find(x => x.name === quoteAsset.name)?.balance} {quoteAsset.name}
                    </div>
                </div>}
            />
        </div>

        <div className="flex justify-between px-6 py-3 ">
            <button className="border shadow-lg border-slate-300 rounded-lg px-4 py-2 text-slate-600" onClick={onClose}>Cancel</button>
            <ConfirmButton onClick={SwapButton} loading={(fetchingQuote || baseAmount === "") ? "opacity-50 cursor-not-allowed" : ""}>
                Confirm & Swap
            </ConfirmButton>
        </div>
    </div>
}

function SwapInputRow({ title, onSelect, Subtitle, inputDisabled, onAmountChange, amount, inputLoading, selectedToken, bottomBorderEnabled, topBorderEnabled }: {
    title: string;
    onSelect: (asset: TokenDetails) => void;    
    Subtitle: React.ReactNode;
    inputDisabled?: boolean;
    onAmountChange?: (amount: string) => void;
    amount?: string;
    inputLoading?: boolean;
    selectedToken: TokenDetails;
    bottomBorderEnabled?: boolean;
    topBorderEnabled?: boolean;
}) {
    return <div>
        <div className={`${topBorderEnabled ? "rounded-b-lg" : ""} ${bottomBorderEnabled ? "rounded-t-lg" : ""} border justify-between w-full h-[150px] rounded-lg bg-slate-50`}>
            <div className="text-sm font-bold px-4 py-3">{title}</div>
            <div className="flex justify-between px-4 py-3">
                <div>
                    <AssetSelector onSelect={onSelect} selectedToken={selectedToken}/>    
                    {Subtitle}
                </div>
                <div className="flex items-center justify-center">
                    <input disabled={inputDisabled} onChange={(e) => {
                        onAmountChange?.(e.target.value);
                    }} placeholder="0" type="text" className="bg-slate-50 p-3 outline-none text-4xl" dir="rtl" value={inputLoading ? "Loading" : amount}></input>
                </div>
            </div>
        </div>
    </div>
}

function AssetSelector({ onSelect, selectedToken }: {
    onSelect: (asset: TokenDetails) => void;
    selectedToken:  TokenDetails;
}) {
    return (
        <Select onValueChange={(value) => {
            const token = SUPPORTED_TOKENS.find(t => t.name === value);
            if (token) onSelect(token);
        }}>
            <SelectTrigger className="w-32 flex items-center space-x-1">
                <SelectValue placeholder="Select a token" defaultValue={selectedToken?.name} />
            </SelectTrigger>
            <SelectContent className="flex">
                {SUPPORTED_TOKENS.map((token) => (
                    <SelectItem key={token.name} value={token.name}>
                        <div className="flex items-center">
                            <img src={token.image} alt={token.name} className="w-6 h-6 rounded-full mr-1" />
                            {token.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
