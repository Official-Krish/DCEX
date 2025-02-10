import { Coins } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-12 bg-white/90 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4 hover:scale-105 transition-transform">
                            <Coins className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-900">CryptoVeda</span>
                        </div>
                        <p className="text-gray-600">India's most trusted decentralized exchange platform</p>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Exchange</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Portfolio</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Markets</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Community</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Twitter</a></li>
                            <li><a href="https://github.com/Official-Krish" className="hover:text-blue-600 transition-colors">Github</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
                    <p>© 2025 CryptoVeda. All rights reserved.</p>
                </div>
            </div>
      </footer>
    )
}