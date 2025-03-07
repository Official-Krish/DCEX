import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/db";
import { reconstructPrivateKey } from "@/lib/crypto";

interface Quote {
    "inputMint": string,
    "inAmount": string,
    "outputMint": string,
    "outAmount": string,
    "otherAmountThreshold":string,
    "swapMode": string,
    "slippageBps": number,
    "platformFee": null,
    "priceImpactPct": string,
    "routePlan": [
        {
            "swapInfo": {
                "ammKey": string,
                "label": string,
                "inputMint": string,
                "outputMint": string,
                "inAmount": string,
                "outAmount": string,
                "feeAmount": string,
                "feeMint": string
            },
            "percent": number
        },
        {
            "swapInfo": {
                "ammKey": string
                "label": string,
                "inputMint": string,
                "outputMint": string,
                "inAmount": string,
                "outAmount": string,
                "feeAmount": string,
                "feeMint": string
            },
            "percent": number
        }
    ],
    "scoreReport": null,
    "contextSlot": number,
    "timeTaken": number,
    "swapUsdValue": string,
    "simplerRouteUsed": boolean
}

export async function POST(req: NextRequest) {
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_CLUSTER_URL || "https://api.mainnet-beta.solana.com");
    const data: {
        quoteResponse: Quote
    } = await req.json();

    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 401
        })
    }

    const solWallet = await prisma.solWallet.findFirst({
        where: {
            userId: session.user.uid
        }
    })

    if (!solWallet) {
        return NextResponse.json({
            message: "Couldnt find associated solana wallet"
        }, {
            status: 401
        })
    }

    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // quoteResponse from /quote api
            quoteResponse: data.quoteResponse,
            // user public key to be used for the swap
            userPublicKey: solWallet.publicKey,
            // auto wrap and unwrap SOL. default is true
            wrapAndUnwrapSol: true,
            // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
          })
        })
      ).json();

      console.log("Jup returned txn")

      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const getPrvivateKey = await reconstructPrivateKey(solWallet.privateKey);
      const privateKey = getPrivateKeyFromDb(getPrvivateKey);
      transaction.sign([privateKey]);
      const latestBlockHash = await connection.getLatestBlockhash();

      // Execute the transaction
      const rawTransaction = transaction.serialize()
      const txid = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
          maxRetries: 2
      });
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
      });

      return NextResponse.json({
        txid
    })
}

function getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}