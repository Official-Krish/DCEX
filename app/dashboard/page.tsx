import DashboardProfile from "@/components/DashboardProfile";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await prisma.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publicKey: true
        }
    })

    if (!userWallet) {
        return {
            error: "No solana wallet found associated to the user"
        }
    }
    
    return {error: null, userWallet};
}


export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return(
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">
                    {userWallet.error}
                </h1>
            </div>
        )
    }

    return(
        <DashboardProfile publicKey={userWallet.userWallet.publicKey} />
    )
}
