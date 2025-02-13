import { ArrowBigDownDash, Globe, LifeBuoy, Lock, QrCode, Zap } from "lucide-react";

const features = [
    {
    icon: <Lock className="h-8 w-8 text-blue-500" />,
    title: "Bank-Grade Security",
    description: "Enterprise-level encryption and security protocols to keep your assets safe.",
    bgColor: "bg-blue-100",
    },
    {
    icon: <Zap className="h-8 w-8 text-green-500" />,
    title: "Lightning Fast",
    description: "Instant transactions and settlements on Solana's high-speed network.",
    bgColor: "bg-green-100",
    },
    {
    icon: <ArrowBigDownDash className="h-8 w-8 text-blue-500" />,
    title: "Low Transaction Fees",
    description: "Minimal fees for transfers and swaps on the Solana network.",
    bgColor: "bg-blue-100",
    },
    {
    icon: <QrCode className="h-8 w-8 text-green-500" />,
    title: "Smart Portfolio Management",
    description: "Advanced tools for tracking and managing your digital assets.",
    bgColor: "bg-green-100",
    },
    {
    icon: <Globe className="h-8 w-8 text-blue-500" />,
    title: "Global Access",
    description: "Send assets to anyone, anywhere, with just a simple link.",
    bgColor: "bg-blue-100",
    },
    {
    icon: <LifeBuoy className="h-8 w-8 text-green-500" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you anytime.",
    bgColor: "bg-green-100",
    },
];
  
export default function Benefits() {
    return (
        <div className="py-20 bg-white relative overflow-hidden min-h-screen">
            <div className="absolute inset-0">
                <div className="absolute w-96 h-96 bg-emerald-50 rounded-full blur-3xl -left-48 top-0 animate-pulse"></div> 
                <div className="absolute w-96 h-96 bg-blue-50 rounded-full blur-3xl -right-48 bottom-0 animate-pulse"></div>
            </div>

            <div className="flex justify-center items-center">
                <div className="max-w-2xl text-center mb-4">
                    <h1 className="text-slate-800 font-bold text-5xl">Why Choose Us</h1>
                    <h2 className="text-xl font-normal text-neutral-700 text-center py-4">Experience the future of digital asset management with our innovative solutions</h2>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 py-4">   
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-xl h-36 py-4 px-8 hover:shadow-2xl ease-in-out transition-all duration-200">
                        <div className={`p-3 rounded-xl text-2xl ${feature.bgColor}`}>{feature.icon}</div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                            <p className="text-gray-600 max-w-md">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}