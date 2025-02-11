import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest){ 
    const amount = req.nextUrl.searchParams.get("amount");
    const inputMint = req.nextUrl.searchParams.get("inputMint");
    const outputMint = req.nextUrl.searchParams.get("outputMint");

    if (!amount || !inputMint || !outputMint) return;
    console.log("data",inputMint, outputMint, amount);

    try{
        const res =  await axios.get(
            `https://api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50&restrictIntermediateTokens=true`
        );
        return NextResponse.json({
            status: 200,
            data: res.data
        });
    } catch(e) {
        return NextResponse.json({
            status: 500,
            error: e
        });
    }
}