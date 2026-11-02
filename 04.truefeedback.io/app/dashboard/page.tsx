'use client';

import { useSession, signOut } from 'next-auth/react';

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center text-neutral-400">
                Loading session...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-8 text-neutral-100">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-sm text-neutral-400">Session verified via NextAuth JWT</p>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: '/sign-in' })}
                    className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition"
                >
                    Sign Out
                </button>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 space-y-4">
                <h2 className="text-lg font-semibold">User Session Payload:</h2>
                <div className="font-mono text-sm space-y-2 bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-neutral-300">
                    <p><span className="text-neutral-500">_id:</span> {session?.user?._id || 'N/A'}</p>
                    <p><span className="text-neutral-500">username:</span> {session?.user?.username || 'N/A'}</p>
                    <p><span className="text-neutral-500">email:</span> {session?.user?.email || 'N/A'}</p>
                    <p><span className="text-neutral-500">isVerified:</span> {String(session?.user?.isVerified)}</p>
                    <p><span className="text-neutral-500">isAcceptingMessages:</span> {String(session?.user?.isAcceptingMessages)}</p>
                </div>
            </div>
        </div>
    );
}