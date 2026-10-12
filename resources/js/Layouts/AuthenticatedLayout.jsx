import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Logo + Nav Links */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="/dashboard"
                                className="text-lg font-bold text-indigo-600 tracking-tight"
                            >
                                HelpDesk
                            </Link>
                            <div className="hidden sm:flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/tickets"
                                    className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    My Tickets
                                </Link>
                            </div>
                        </div>

                        {/* Right: New Ticket + User */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/tickets/create"
                                className="hidden sm:inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                + New Ticket
                            </Link>
                            <span className="hidden sm:block text-sm text-gray-600">
                                {auth.user?.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="hidden sm:inline-flex text-sm text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Logout
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                className="sm:hidden p-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="sm:hidden pb-3 pt-2 border-t border-gray-100 space-y-1">
                            <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                                Dashboard
                            </Link>
                            <Link href="/tickets" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                                My Tickets
                            </Link>
                            <Link href="/tickets/create" className="block px-3 py-2 text-sm text-indigo-600 font-medium hover:bg-gray-50 rounded">
                                + New Ticket
                            </Link>
                            <p className="px-3 py-2 text-sm text-gray-500">{auth.user?.name}</p>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50 rounded"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </main>

            <FlashMessage />
        </div>
    );
}
