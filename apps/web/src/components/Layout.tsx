import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-dark-950">
            <Navbar />
            <main className="container-custom py-8">
                {children}
            </main>
            <footer className="border-t border-dark-800 mt-20">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-dark-400 text-sm">
                            © 2026 HashTribe. Built for developers, by developers.
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="link">GitHub</a>
                            <a href="#" className="link">Documentation</a>
                            <a href="#" className="link">Community</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
