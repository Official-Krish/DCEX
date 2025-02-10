import { ArrowRightLeft, IndianRupee, LineChart, Shield, Wallet } from "lucide-react";

export default function Hero() {
    return (
        <div>
            <main className="container mx-auto px-6 py-12 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                        India's Premier Decentralized Exchange Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 animate-fade-in-delay">
                        Manage your crypto portfolio and trade Solana tokens with confidence on India's most trusted DEX platform
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in-delay-2">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl">
                        Start Trading
                        </button>
                        <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl">
                        View Markets
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform floating-element">
                        <h3 className="text-3xl font-bold text-gray-900">$1B+</h3>
                        <p className="text-gray-600">Total Volume</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform floating-element" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-3xl font-bold text-gray-900">100K+</h3>
                        <p className="text-gray-600">Active Users</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform floating-element" style={{ animationDelay: '0.4s' }}>
                        <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                        <p className="text-gray-600">Tokens Listed</p>
                    </div>
                </div>

                {/* Features */}
                <section id="features" className="py-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose CryptoVeda?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform">
                            <Wallet className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Portfolio Management</h3>
                            <p className="text-gray-600">Track and manage your crypto assets with advanced portfolio tools</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform">
                            <ArrowRightLeft className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Swaps</h3>
                            <p className="text-gray-600">Convert Solana tokens instantly with minimal fees</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform">
                            <Shield className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bank-Grade Security</h3>
                            <p className="text-gray-600">Your assets are protected with military-grade encryption</p>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section id="how-it-works" className="py-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Get Started in Minutes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Wallet className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 font-semibold mb-2">Connect Wallet</h3>
                            <p className="text-gray-600">Link your Solana wallet securely</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <IndianRupee className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 font-semibold mb-2">Deposit Funds</h3>
                            <p className="text-gray-600">Add INR or crypto to your account</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <ArrowRightLeft className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 font-semibold mb-2">Trade Assets</h3>
                            <p className="text-gray-600">Swap tokens at best rates</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <LineChart className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-gray-900 font-semibold mb-2">Track Portfolio</h3>
                        <p className="text-gray-600">Monitor your investments</p>
                    </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg hover:shadow-xl transition-all">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Trading?</h2>
                        <p className="text-xl text-gray-600 mb-8">Join thousands of Indians trading on the most trusted DEX platform</p>
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-xl">
                        Launch Exchange
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}