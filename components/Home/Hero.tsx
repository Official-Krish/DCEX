"use client";

import { Check, CircleCheck } from "lucide-react";
import { Button } from "../ui/button";

const steps = [
    "Google Account Integration",
    "Instant Solana Transactions",
    "Share via Link",
]

export default function Hero() {
    return (
        <div className="grid grid-cols-2 pt-24 min-h-[70vh] bg-gradient-to-br from-blue-50 to-white">
            <div className="p-12">
                <h1 className="text-6xl font-bold text-slate-800">The World's Simplest</h1> 
                <h2 className="text-6xl font-bold text-blue-500">Web3 Wallet</h2>

                <h3 className="text-lg font-normal text-neutral-600 mt-8">Create or login to your secured wallet with just a Google Account. Send digital assets at scale, even to non-crypto users.</h3>
                <div className="mt-5 space-x-4">
                    <Button className="bg-blue-500 px-8 py-6 font-bold hover:bg-blue-600 shadow-lg">Get Started</Button>
                    <Button className="bg-white text-slate-700 px-8 py-6 font-semibold border hover:bg-slate-50">Learn More</Button>
                </div>
            </div>
            <div>
                <div className="p-12 items-center">
                    <div className="h-[260px] w-[600px] rounded-xl bg-white shadow-lg">
                        <div className="flex pt-8 px-9 items-center">
                            <div className="bg-blue-100 rounded-full w-12 h-12 flex justify-center items-center">
                                <CircleCheck className="text-blue-500 w-7 h-7" />
                            </div>
                            <span className="ml-4 font-bold text-lg">Secure & Simple</span>
                        </div>

                        <div className="pt-6 px-9">
                            {steps.map((step, index) => (
                                <div key={index} className="flex py-2 items-center">
                                    <Check className="text-green-500 w-5 h-5 mr-3" />
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}