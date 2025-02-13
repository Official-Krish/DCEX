"use client";
import { CircleHelp, SquareArrowOutUpRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function CTA() {
    return (
        <div className="py-20 relative overflow-hidden h-[670px]">
            <div className="absolute inset-0 bg-gradient-to-br bg-white ">
                <div className="absolute w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] -top-48 -right-48 animate-pulse"></div> 
                <div className="absolute w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px] -bottom-48 -left-48 animate-pulse"></div>

                <div className="flex justify-center items-center mt-20">
                    <div className="w-[900px] h-[450px] bg-white rounded-3xl shadow-xl border">
                        <div className="text-center items-center mt-14">
                            <h1 className="text-slate-800 font-bold text-5xl">Start Your Crypto Journey Today</h1>
                            <div className="flex justify-center items-center">
                                <h2 className="text-xl font-normal text-neutral-700 mt-6 max-w-xl">Join thousands of users who have already simplified their crypto experience. Get started with just your Google account.</h2>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center items-center space-x-4">
                            <button className="flex bg-blue-500 hover:bg-blue-600 text-white px-6 py-3.5 font-normal text-lg rounded-xl items-center shadow-lg">
                                <SquareArrowOutUpRight className="h-6 w-6 mr-2" />
                                Get Started Now
                            </button>

                            <button className="flex bg-white text-black px-5 py-3.5 rounded-xl hover:bg-slate-50 border border-slate-200">
                                <CircleHelp className="h-6 w-6 mr-2" />
                                <span className="text-lg font-normal">Learn More</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-500 mb-2">
                                    100k+
                                </div>
                                <div className="text-neutral-600">
                                    Active Users
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-500 mb-2">
                                    $100M+
                                </div>
                                <div className="text-neutral-600">
                                    Assets Assigned
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-500 mb-2">
                                    1M+
                                </div>
                                <div className="text-neutral-600">
                                    Transactions Processed
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="text-center text-neutral-500 text-md mt-14">
                    Already have an account?
                    <button onClick={() => signIn("google")} className="text-blue-500 hover:underline ml-1">Sign In</button>
                </div>
            </div>
        </div>
    )
}