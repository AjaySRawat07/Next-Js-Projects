'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setErrorMessage(data.message || 'Registration failed');
                setIsSubmitting(false);
                return;
            }

            // Registration successful -> redirect to verification page with username param
            router.replace(`/verify/${formData.username}`);
        } catch (err: any) {
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl text-neutral-100">
                <h1 className="mb-2 text-2xl font-bold tracking-tight">Join TrueFeedback</h1>
                <p className="mb-6 text-sm text-neutral-400">Sign up to start receiving anonymous messages</p>

                {errorMessage && (
                    <div className="mb-4 rounded-lg bg-red-950/50 border border-red-800 p-3 text-sm text-red-300">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="unique_username"
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-400">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="font-medium text-white underline underline-offset-4">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}