import { ArrowLeftRight, Check, CircleDollarSign, Share } from "lucide-react"

const features = [
    {
        icon: <CircleDollarSign className="h-8 w-8 text-blue-500" />,
        title: "Portfolio Management",
        description: "Track, manage, and analyze your digital assets in real-time with comprehensive portfolio tools.",
        points: [
            "Real-time price updates",
            "Performance analytics",
            "Asset allocation insights"
        ],
        bg: "bg-blue-100",
    },
    {
        icon: <ArrowLeftRight className="h-8 w-8 text-green-500" />,
        title: "Token Swaps",
        description: "Instantly swap Solana tokens with best-in-class rates and minimal fees.",
        bg: "bg-green-100",
        points: [
            "Best price routing",
            "Low transaction fees",
            "Instant settlements"
        ]
    },
    {
        icon: <Share className="h-8 w-8 text-blue-500" />,
        title: "Easy Sharing",
        description: "Share assets with anyone using simple links - no wallet required for recipients.",
        bg: "bg-blue-100",
        points: [
            "Shareable links",
            "No wallet needed",
            "Secure transfers"
        ]
    },
]

export default function Features () {
    return (
        <div className="bg-blue-50 min-h-screen">
            <div className="flex justify-center items-center">
                <div className="max-w-2xl mt-20">
                    <h1 className="text-slate-800 font-bold text-4xl">Powerful Features, Simple Experience</h1>
                    <h2 className="text-xl font-normal text-neutral-700 max-w-3xl text-center py-4">Everything you need to manage your digital assets, wrapped in an intuitive interface</h2>
                </div>
            </div>
            <div>
                <div className="flex justify-center items-center mt-8">
                    {features.map((feature, index) => (
                        <div className="bg-white rounded-xl p-4 w-[410px] h-[390px] border shadow-xl m-3 mr-3 hover:shadow-2xl">
                            <div className="px-4 py-4">
                                <div className={`${feature.bg} rounded-3xl text-3xl h-16 w-16 flex justify-center items-center`}>{feature.icon}</div>
                                <h3 className="text-xl font-bold mt-7">{feature.title}</h3>
                                <p className="text-gray-600 mt-4">{feature.description}</p>
                                <div className="mt-4">
                                    <div className="space-y-4">
                                        {feature.points.map((point, index) => (
                                            <div key={index} className="flex items-center">
                                                <Check className="text-green-500 w-5 h-5 mr-3" />
                                                <span className="text-sm font-normal ">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}