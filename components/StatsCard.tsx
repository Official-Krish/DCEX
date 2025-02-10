export const stats = [
    {
        title: "$1B+",
        description: "Total Volume"
    },
    {
        title: "100K+",
        description: "Active Users"
    },
    {
        title: "500+",
        description: "Tokens Listed"
    },
]

export const StatsCard = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform floating-element">
            <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}