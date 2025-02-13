"use client"
import { ArrowLeftRight, ArrowRight, Plus, UserRound } from "lucide-react"
import { signIn } from "next-auth/react"

const steps = [
    {
        icon: <UserRound className="h-8 w-8 text-blue-500" />,
        title: "Connect with Google",
        description: "Click login and authenticate with your Google account. No complex registration needed."
    },
    {
        icon: <Plus className="h-8 w-8 text-blue-500" />,
        title: "Fund Your Wallet",
        description: "Add funds using UPI, bank transfer, or deposit existing crypto assets."
    },
    {
        icon: <ArrowLeftRight className="h-8 w-8 text-blue-500" />,
        title: "Start Trading",
        description: "Swap tokens, manage your portfolio, and share assets instantly with anyone."
    },
]


export default function StepsToStart() {
    return (
        <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
            <div className="flex justify-center items-center">
                <div className="max-w-2xl mt-20 text-center mb-4">
                    <h1 className="text-slate-800 font-bold text-4xl">Simple Steps to Get Started</h1>
                    <h2 className="text-xl font-normal text-neutral-700 text-center py-4">Begin your crypto journey in minutes with our straightforward process</h2>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mt-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center p-6 rounded-xl shadow-md bg-white m-4 w-[320px] h-[300px] hover:shadow-2xl ease-in-out transition-all duration-200">
                            <div className="absolute -top-5 flex items-center justify-center w-10 h-10 bg-blue-600 text-white text-lg font-bold rounded-full">
                                {index + 1}
                            </div>
                            <div className="p-4 rounded-xl bg-blue-100 text-4xl mt-8">{step.icon}</div>
                            <h3 className="text-lg font-bold mt-6">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center mt-8">
                <button className="flex bg-blue-500 hover:bg-blue-600 text-white px-7 py-4 font-bold text-lg rounded-xl mt-8 items-center" onClick={() => signIn("google")}>
                    Start Now
                    <ArrowRight className="h-6 w-6 ml-2 "/>
                </button>
            </div>
        </div>
    )
}