import { ClipboardCheck, Lock, Shield } from "lucide-react"

const features = [
    {
        icon: <Lock className="h-6 w-6 text-blue-500" />,
        title: "Multi-factor Authentication",
        description: "Enhanced security with Google authentication and additional verification layers",
        bgColor: "bg-blue-100",
    }, {
        icon: <Shield className="h-6 w-6 text-green-500" />,
        title: "Secure Infrastructure",
        description: "Enterprise-grade encryption and secure key management systems",
        bgColor: "bg-green-100",
    },
    {
        icon: <ClipboardCheck className="h-6 w-6 text-blue-500" />,
        title: "Regular Audits",
        description: "Continuous security assessments and third-party audits",
        bgColor: "bg-blue-100",
    }
]

export default function Security() {
    return (
        <div className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -top-48 -right-48 animate-pulse"></div>
                <div className="absolute w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px] -bottom-48 -left-48 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-slate-800 font-bold text-4xl">Bank-Grade Security for Your Digital Assets</h1>
                            <h2 className="text-lg font-normal text-neutral-700 py-5 mb-3">Your security is our top priority. We implement multiple layers of protection to ensure your assets are safe.</h2>
                            {features.map((feature, index) => (
                                <div className="flex mb-7">
                                    <div className={`rounded-xl text-lg ${feature.bgColor} h-[50px] w-[50px] flex justify-center items-center`} >{feature.icon}</div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                                        <p className="text-gray-600 max-w-md">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SecurityFeatures />
                    </div>
                </div>
            </div>
        </div>
    )
}


function SecurityFeatures() {
    const features = [
        {
            title: "Encryption",
            description: "AES-256",
        },
        {
            title: "Key Storage",
            description: "Multi-Sig",
        },
        {
            title: "Access Control",
            description: "O Auth 2.0",
        },
        {
            title: "Monitoring",
            description: "24/7",
        }
    ]
    return (
        <div className="h-[520px] w-[550px] bg-blue-50 rounded-2xl shadow-xl border">
            <div className="flex justify-center items-center mt-12">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex justify-center items-center">
                    <Lock className="h-12 w-12 text-blue-500" />
                </div>
            </div>
            <div className="text-center my-8">
                <h3 className="text-2xl font-semibold">Security Features</h3>
                <p className="text-gray-600 text-md mt-3">Industry-leading security measures to protect your assets</p>
            </div>
            {features.map((feature, index) => (
                <div key={index} className="flex justify-between items-center py-4 px-8">
                    <h3 className="text-md font-light">{feature.title}</h3>
                    <p className="text-green-500">{feature.description}</p>
                </div>
            ))}
        </div>
    )
}