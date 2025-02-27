import prisma from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";
import {Keypair} from "@solana/web3.js";
import { Session } from "next-auth";
import crypto from "crypto";
import { encryptSecret } from "./crypto";
import { split } from 'shamir-secret-sharing';


export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              newSession.user.uid = token.uid ?? "";
            }
            return newSession!;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, account }: any) {
            const user = await prisma.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            if (user) {
              token.uid = user.id
            }
            return token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async signIn({user, account, profile }: any) {
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
                const encryptedSecret = encryptSecret(privateKey.toString() , process.env.ENCRYPTION_KEY ?? "");
                const shares = split(Buffer.from(encryptedSecret), 5, 3);

                await prisma.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        profileImage: (profile as any)?.picture || "Https://www.gravatar.com/avatar/",
                        provider: "GOOGLE",
                        solWallet: {
                            create: {
                                publicKey: publicKey,
                                privateKey: (await shares as Buffer[]).map(share => share.toString()),
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
}