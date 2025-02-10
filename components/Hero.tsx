"use client";
import { signIn, useSession } from "next-auth/react";
import { FeatureCard, features} from "./FeatureCard";
import { stats, StatsCard } from "./StatsCard";
import Google from "./ui/Google";
import { working, WorkingSection } from "./Working";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function Hero() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.data?.user) {
          router.push('/new-route');
        }
    }, [router]);

    return (
        <div>
            <main className="container mx-auto px-6 py-12 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                        India's Premier Decentralized Exchange Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 animate-fade-in-delay">
                        Create or login to your secured CryptoVeda wallet with just 2 clicks. Manage your portfolio and convert Solana tokens effortlessly.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in-delay-2">
                        <button className="flex justify-center items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl" onClick={() => signIn("google")}>
                            {<Google width="26" height="26"/>}
                            {<span className="ml-2">Sign up with Google</span>}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} title={stat.title} description={stat.description} />
                    ))}
                </div>

                {/* Features */}
                <section id="features" className="py-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose CryptoVeda?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </section>

                {/* How it Works */}
                <section id="how-it-works" className="py-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get Started in Minutes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {working.map((work, index) => (
                            <WorkingSection key={index} {...work} />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg hover:shadow-xl transition-all">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Try it for yourself</h2>
                        <p className="text-xl text-gray-600 mb-8">Create and send crypto with CryptoVeda!</p>
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl" onClick={() => signIn("google")}>
                            Launch Exchange
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}