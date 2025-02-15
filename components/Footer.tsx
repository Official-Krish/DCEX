import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-16 relative overflow-hidden h-[450px]">
            <div className="absolute inset-0">
                <div className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -top-48 -right-48"></div>
                <div  className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -bottom-48 -left-48"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">DCEX</h3>
                        <p className="text-neutral-400">The simplest way to manage your digital assets with just a Google account.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-neutral-400 hover:text-neutral-200">{<Twitter className="h-6 w-6"/>}</a>
                            <a href="#" className="text-neutral-400 hover:text-neutral-200">{<Github className="h-6 w-6"/>}</a>
                            <a href="#" className="text-neutral-400 hover:text-neutral-200">{<Linkedin className="h-6 w-6"/>}</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">Exchange</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">Portfolio</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">Markets</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">News</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">Documentation</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">API</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">Support</a></li>
                            <li><a href="#" className="text-neutral-400 hover:text-neutral-200">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">NewsLetter</h4>
                        <p className="text-neutral-400 mb-4">Stay updated with our latest features and releases.</p>
                        <form className="space-y-4">
                            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
                            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-neutral-800">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-neutral-400">© 2025 DCEX. All rights reserved.</p>

                        <div className="flex space-x-4">
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Terms of Service</a>
                            <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
      </footer>
    )
}