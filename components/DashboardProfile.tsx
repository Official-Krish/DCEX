"use client";
import { useState } from "react";
import PrimaryButton from "./Buttons/PrimaryButton";
import TokenList from "./TokenList";
import UserInfo from "./UserInfo";
import Swap from "./Swap";
import Send from "./Send";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

enum Options {
    Send = "Send",
    AddFunds = "Add Funds",
    Withdraw = "Withdraw",
    Swap = "Swap",
}

type tabs = "tokens" | "Send" | "AddFunds" | "Withdraw" | "Swap";


export default function DashboardProfile({ publicKey }: { publicKey: string }) {
    const [option, setOption] = useState<Options>(Options.Send);
    const [ tab, setTab ] = useState<tabs>("tokens");
    const session = useSession();
    const router = useRouter();

    if (!session.data?.user){
        alert("Please login to access your dashboard");
        router.push("/");
    }

    return <div>
        <div className="bg-slate-100 flex flex-col justify-center items-center ">
            <div className="shadow-lg rounded-lg bg-white w-[800px] h-[350px] p-4 mt-12">
                <UserInfo publicKey={publicKey} />
                <div className="px-6 py-3">
                    <div className="flex justify-around space-x-4">
                        <PrimaryButton onClick={() =>{
                                setOption(Options.Send)
                                setTab("Send")
                            }
                        }active={option === Options.Send}>
                            Send
                        </PrimaryButton>

                        <PrimaryButton onClick={() =>{
                                setOption(Options.AddFunds)
                                setTab("AddFunds")
                            }
                        }active={option === Options.AddFunds}>
                            Add Funds
                        </PrimaryButton>

                        <PrimaryButton onClick={() =>{
                                setOption(Options.Withdraw)
                                setTab("Withdraw")
                            }
                        } active={option === Options.Withdraw}>
                                Withdraw
                        </PrimaryButton>

                        <PrimaryButton onClick={() => {
                                setOption(Options.Swap)
                                setTab("Swap")
                            }
                        } active={option === Options.Swap}>
                            Swap
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-[800px] flex-grow min-h-[300px] pb-10 mt-6">
                {tab === "tokens" && <TokenList publicKey={publicKey} />}
                {tab === "Swap" && <Swap publicKey={publicKey} onClose={() => setTab("tokens")} />}
                {tab === "Send" && <Send onclose={() => setTab("tokens")} publicKey={publicKey} />}
            </div>
        </div>
    </div>
}   