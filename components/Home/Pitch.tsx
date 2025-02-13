import { Box, CirclePlay, Clipboard, Lock, Zap } from "lucide-react";
import { Button } from "../ui/button";

const features = [
    {
        icon: <Lock className="h-8 w-8 text-blue-500" />,
        title: "Secure Login",
        description: "2-click authentication with your Google account.",
        bg: "bg-blue-100",
    },
    {
        icon: <Zap className="h-8 w-8 text-green-500" />,
        title: "Instant Transfer",
        description: "Send assets via simple shareable links.",
        bg: "bg-green-100",
    },
    {
        icon: <Clipboard className="h-8 w-8 text-blue-500" />,
        title: "Multi-Token Support",
        description: "Manage all your Solana tokens in one place.",
        bg: "bg-blue-100",
    },
]

export default function Pitch() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-neutral-50 overflow-hidden">
            <div className="flex justify-center items-center mt-24">
                <div className="max-w-[900px]">
                    <div className="flex space-x-3">
                        <h1 className="text-7xl font-bold text-slate-800">The</h1>
                        <h1 className="text-blue-500 font-bold text-7xl">Simplest Way</h1>
                        <h1 className="text-7xl font-bold text-slate-800">to</h1>

                    </div>
                    <div className="text-center">
                        <h1 className="text-7xl font-bold text-slate-800">Enter Web3</h1>
                    </div>
                </div>
            </div>
            <div className="py-6 flex justify-center items-center">
                <span className="text-2xl font-normal text-neutral-700 max-w-3xl text-center">
                    Create your secure wallet with just a Google account. Send, receive, and manage digital assets with unprecedented ease.
                </span>
            </div>

            <div className="flex justify-center items-center space-x-6">
                <Button className="flex bg-blue-500 hover:bg-blue-600 text-white px-7 py-7 font-bold text-lg rounded-xl">
                    {<Box className="h-10 w-10"/>}
                    Get Started Now
                </Button>
                <Button className="flex bg-white text-black px-9 py-7 rounded-xl hover:bg-slate-50 border border-slate-200">
                    <CirclePlay className="h-10 w-10"/>
                    Watch Demo
                </Button>
            </div>

            <div className="flex justify-center items-center">
                <div className="w-[850px] h-[270px] bg-white shadow-xl rounded-2xl mt-16 border">
                    <div className="flex justify-between px-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-white mt-6">
                            <div className={`${feature.bg} p-4 rounded-2xl text-3xl`}>{feature.icon}</div>
                            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}