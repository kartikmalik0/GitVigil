import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground mt-8 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">GitVigil</h2>
                        <p className="text-sm">Master your Git streak with ease. Boost productivity and manage your GitHub contributions effortlessly.</p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/kartikmalik0" className="hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/kartikmalik1" className="hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
                            <li><a href="/login" className="hover:text-primary transition-colors">Login</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="https://docs.kartikmalik.tech" className="hover:text-primary transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                            <li><a href="/contact" className="hover:text-primary transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and tips.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-3 py-2 bg-background text-foreground rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-sm">
                    <p>© {new Date().getFullYear()} GitVigil. All rights reserved.</p>
                    <div className="mt-2 space-x-4">
                        <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer


// f0855ee235524d370ab2e22fbd56c0c9979ff96afea77c288c0db39fb0ad1c20f3acfd7492ecb418b72f1927534602e3113c59583a73af6c6c50151df33441776735694e484cb2195f503dd36ec73ab5e4f935b5019cea28c4f4a41ba1e784c8