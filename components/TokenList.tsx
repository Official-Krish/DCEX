import { useState } from "react"
import { UserTokens } from "./UserToken";

export default function TokenList ({ publicKey }: {publicKey: string}) {
    const [ selected, setSelected ] = useState<"tokens" | "nfts" | "activity">("tokens");
    return (
        <div className="bg-slate-100 py-6 w-full h-full border-l-1 border-r-1 border-b-1 border-slate-200 rounded-lg shadow-lg"> 
            <div className="flex justify-start space-x-6 px-4 border-b-2 border-slate-200">
                <h2 className={`cursor-pointer ${selected === "tokens" ? "border-b-2 border-black" : ""}`} onClick={() => setSelected("tokens")}>Tokens</h2>
                <h2 className={`cursor-pointer ${selected === "nfts" ? "border-b-2 border-black" : ""}`} onClick={() => setSelected("nfts")}>NFTs</h2>
                <h2 className={`cursor-pointer ${selected === "activity" ? "border-b-2 border-black" : ""}`} onClick={() => setSelected("activity")}>Activity</h2>
            </div>

            {selected === "tokens" && (
                <div>
                    <UserTokens publicKey={publicKey} />
                </div>
            )}
        </div>
    )
}