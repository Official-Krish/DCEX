import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

enum Options {
    Send = "Send",
    AddFunds = "Add Funds",
    Withdraw = "Withdraw",
    Swap = "Swap",
}

export default function DashboardOptions() {
    const [option, setOption] = useState<Options>(Options.Send);

    return (
        <div className="flex justify-around space-x-4">
            <PrimaryButton onClick={() => setOption(Options.Send)} active={option === Options.Send}>Send</PrimaryButton>
            <PrimaryButton onClick={() => setOption(Options.AddFunds)} active={option === Options.AddFunds}>Add Funds</PrimaryButton>
            <PrimaryButton onClick={() => setOption(Options.Withdraw)} active={option === Options.Withdraw}>Withdraw</PrimaryButton>
            <PrimaryButton onClick={() => setOption(Options.Swap)} active={option === Options.Swap}>Swap</PrimaryButton>
        </div>
    );
}
