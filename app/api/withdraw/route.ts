import { authConfig } from "@/lib/auth";
import prisma from "@/lib/db";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


const MAX_AMOUNT = 1000; 
const MIN_AMOUNT = 0.000001;

export async function POST (req: NextRequest) {
    if (!process.env.SOLANA_CLUSTER_URL) {
        throw new Error("SOLANA_CLUSTER_URL is not configured");
    }

    const connection = new Connection(process.env.SOLANA_CLUSTER_URL);

    const session = await getServerSession(authConfig);

    try {
        if (!session?.user) {
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 401
            });
        }

        const data = await req.json();
        const { recipientAddress, amount } = data;

        if (!recipientAddress || !amount ) {
            return NextResponse.json({
                message: "Missing required fields"
            }, {
                status: 400
            });
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= MIN_AMOUNT || numAmount > MAX_AMOUNT) {
            return NextResponse.json({
                message: `Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT} SOL`
            }, {
                status: 400
            });
        }

        const solWallet = await prisma.solWallet.findFirst({
            where: {
                userId: session.user.uid
            }
        });

        if (!solWallet) {
            return NextResponse.json({
                message: "No associated Solana wallet found"
            }, {
                status: 404
            });
        }

        const senderPubKey = new PublicKey(solWallet.publicKey);
        const balance = await connection.getBalance(senderPubKey);
        const requiredAmount = numAmount * LAMPORTS_PER_SOL;
        
        if (balance < requiredAmount) {
            return NextResponse.json({
                message: "Insufficient balance"
            }, {
                status: 400
            });
        }

        

        const transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: senderPubKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: requiredAmount
            })
        );

        const privateKey = getPrivateKeyFromDb(solWallet.privateKey);
        const signature = await sendAndConfirmTransaction(
            connection, 
            transaction, 
            [privateKey]
        );

        const confirmedTransaction = await connection.confirmTransaction(signature);
        if (confirmedTransaction.value.err) {
            throw new Error("Transaction failed to confirm");
        }

        return NextResponse.json({
            message: "Transaction successful",
            signature,
            confirmedTransaction
        });
    } catch (e) {
        console.error("Transaction failed:", e);
        return NextResponse.json({
            message: "Transaction failed: " + (e instanceof Error ? e.message : "Unknown error"),
            error: true
        }, {
            status: 500
        });
    }

}

function getPrivateKeyFromDb(privateKey: string): Keypair {
    try {
        const arr = privateKey.split(",").map(x => Number(x));
        const privateKeyUintArr = Uint8Array.from(arr);
        return Keypair.fromSecretKey(privateKeyUintArr);
    } catch (e) {
        throw new Error("Failed to process private key");
    }
}