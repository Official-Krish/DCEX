import { ArrowRightLeft, IndianRupee, Shield, Wallet } from "lucide-react"

export const features = [
    {
        title: "2-Click Google Login",
        description: "Create or access your secure wallet instantly with your Google account.",
        icon: <Shield className="w-12 h-12 mb-4" />
    },
    {
        title: "Send Assets",
        description: "Send digital assets at scale, even to non-crypto users",
        icon: <IndianRupee className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
        title: "Deposit Funds",
        description: "Add INR or crypto to your account",
        icon: <ArrowRightLeft className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
        title: "Portfolio Management",
        description: "Track and manage your crypto assets with advanced portfolio tools",
        icon: <Wallet className="h-12 w-12 text-blue-600 mb-4" />
    },
    {
        title: "Instant Swaps",
        description: "Convert Solana tokens instantly with minimal fees",
        icon: <ArrowRightLeft className="h-12 w-12 text-blue-600 mb-4" />
    },
    {
        title: "Bank-Grade Security",
        description: "Your assets are protected with military-grade encryption",
        icon: <Shield className="h-12 w-12 text-blue-600 mb-4" />
    }
]

export const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform">
            {icon}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}