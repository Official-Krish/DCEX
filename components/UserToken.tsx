import { useTokens } from "@/app/api/hooks/useTokens";
import { Loader2 } from "lucide-react";

export function UserTokens({ publicKey }: { publicKey: string }) {
    const { tokenBalances, loading } = useTokens(publicKey);

    if (loading) return <div className="flex justify-center items-center">{<Loader2 className="animate-spin h-8 w-8" />}</div>

    return (
        <div key={publicKey}>
            {tokenBalances?.tokens?.map((token, index) => (
                <div className="flex justify-between mt-2">
                    <div key={index} className="flex py-3 px-4">
                        <div className="flex items-center">
                            <img 
                                src={token.image} 
                                alt={token.name} 
                                width={30} 
                                height={30} 
                                className="rounded-full mr-2" 
                            />
                            <div>
                                <h2 className="text-sm font-bold">{token.name === "SOL" ? "Solana" : token.name}</h2>
                                <h2 className="text-xs font-bold text-slate-400">1 {token.name} = {token.price}</h2>
                            </div>
                        </div>
                        
                    </div>
                    <div className="px-6 py-3">
                        <h2 className="text-sm font-bold">${token.usdBalance}</h2>  
                        <h2 className="text-xs font-bold text-slate-400"> {token.balance} {token.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}