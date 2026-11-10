'use client';

import { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

function VerifyAccountForm() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const rawUsername = params.username || '';
    const decodedUsername = decodeURIComponent(rawUsername);

    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: decodedUsername,
                code: code.trim(),
            });

            if (response.data.success) {
                setSuccessMessage('Account verified successfully! Redirecting to sign in...');
                setTimeout(() => {
                    router.replace('/sign-in');
                }, 1500);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setErrorMessage(
                axiosError.response?.data.message ?? 'Verification failed. Please check your code.'
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-xl text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Verify Your Account
                </h1>
                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                    Enter the 6-digit code sent to your email for{' '}
                    <span className="font-semibold text-neutral-900 dark:text-white">@{decodedUsername}</span>
                </p>

                {errorMessage && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            required
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            className="w-full text-center tracking-[0.5em] font-mono text-lg rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || code.length !== 6}
                        className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify Code'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                    Need a new code?{' '}
                    <Link
                        href="/sign-up"
                        className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
                    >
                        Sign up again
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function VerifyAccountPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-neutral-400 text-sm">
                    Loading verification...
                </div>
            }
        >
            <VerifyAccountForm />
        </Suspense>
    );
}