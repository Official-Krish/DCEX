import { Check } from "lucide-react";
import React from "react";

export default function ConfirmButton({ onClick, children, loading }: { onClick: () => void, children: React.ReactNode, loading: React.ReactNode }) {
    return (
        <button className={`flex justify-center items-center bg-black text-white border border-slate-300 rounded-lg px-6 py-2 ${loading}`} onClick={onClick}>
            {<Check className="w-5 h-5 mr-2"/>} 
            {children}
        </button>
    )
}