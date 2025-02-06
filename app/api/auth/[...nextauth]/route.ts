import prisma from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {Keypair} from "@solana/web3.js";

enum Provider {
    google = "GOOGLE"
}

function getProvider(provider: string): Provider {
    switch (provider) {
        case "google":
            return Provider.google;
        default:
            return Provider.google;
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (account?.provider === "google") {
                const email = user.email;
                if(!email) return false;

                const userDb = await prisma.user.findFirst({
                    where: {
                        username: email
                    }
                });
                if(userDb) return true;

                const keypair = Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;

                await prisma.user.create({
                    data: {
                        username: email,
                        provider: getProvider(account.provider),
                        solWallet: {
                            create: {
                                publicKey: publicKey,
                                privateKey: privateKey.toString(),
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0,
                            }
                        }
                    }
                });
                return true;
            }
            return false;
        },
    },
})

export { handler as GET, handler as POST }