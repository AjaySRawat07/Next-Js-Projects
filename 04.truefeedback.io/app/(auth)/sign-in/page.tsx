'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            identifier,
            password,
        });

        if (result?.error) {
            setError(result.error);
            setIsSubmitting(false);
        } else if (result?.url) {
            router.replace('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl text-neutral-100">
                <h1 className="mb-2 text-2xl font-bold tracking-tight">Sign In to TrueFeedback</h1>
                <p className="mb-6 text-sm text-neutral-400">Enter your email or username to continue</p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-950/50 border border-red-800 p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="username or user@example.com"
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="font-medium text-white underline underline-offset-4">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}