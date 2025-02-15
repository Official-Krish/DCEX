import { SUPPORTED_TOKENS, TokenDetails } from "@/lib/tokens";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Image from "next/image";

export default function AssetSelector({ onSelect, selectedToken }: {
    onSelect: (asset: TokenDetails) => void;
    selectedToken:  TokenDetails;
}) {
    return (
        <Select onValueChange={(value) => {
            const token = SUPPORTED_TOKENS.find(t => t.name === value);
            if (token) onSelect(token);
        }}>
            <SelectTrigger className="flex items-center space-x-1 w-full justify-center h-18"> 
                <SelectValue placeholder="Select a token" defaultValue={selectedToken?.name} />
            </SelectTrigger>
            <SelectContent className="flex">
                {SUPPORTED_TOKENS.map((token) => (
                    <SelectItem key={token.name} value={token.name}>
                        <div className="flex items-center w-full text-slate-900 font-semibold text-lg">
                            <span className="mr-1 text-slate-500 font-semibold text-lg">Asset:</span>
                            <Image src={token.image} alt={token.name} width={30} height={30} className="rounded-full mr-1" />
                             {token.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}