import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                {children}
            </main>
            <footer className="border-t border-charcoal-800 bg-charcoal-950/50 mt-auto backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-grey-400 text-sm">
                            © 2026 HashTribe. Built by developers.
                        </div>

                        <div className="text-grey-500 font-medium text-sm tracking-wide">
                            A nFKs Affiliate
                        </div>

                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-grey-400 hover:text-white transition-colors">GitHub</a>
                            <a href="#" className="text-grey-400 hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="text-grey-400 hover:text-white transition-colors">Community</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
