import { ArrowRightLeft, IndianRupee, LineChart, Wallet } from "lucide-react"

export const working = [
    {
        title: "Connect Wallet",
        description: "Link your Solana wallet securely.",
        icon: <Wallet className="h-8 w-8 text-blue-600" />,
    },
    {
        title: "Deposit Funds",
        description: "Add INR or crypto to your account.",
        icon: <IndianRupee className="h-8 w-8 text-blue-600" />,
    },
    {
        title: "Trade Assets",
        description: "Swap tokens at best rates.",
        icon: <ArrowRightLeft className="h-8 w-8 text-blue-600" />,
    },
    {
        title: "Track Portfolio",
        description: "Monitor your investments.",
        icon: <LineChart className="h-8 w-8 text-blue-600" />,
    }

]

export const WorkingSection = ({icon, title, description}: {icon: React.ReactNode, title: string, description: string}) => {
    return <div>
        <div className="text-center group">
            <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
}