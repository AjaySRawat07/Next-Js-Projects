'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useDebounceValue } from 'usehooks-ts';
import { ApiResponse } from '@/types/ApiResponse';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Debounce the username by 600ms
    const [debouncedUsername] = useDebounceValue(username, 600);

    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    // Real-time username uniqueness check
    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (debouncedUsername.trim().length >= 2) {

                setUsernameMessage('');

                try {
                    const response = await axios.get<ApiResponse>(
                        `/api/check-username-unique?username=${encodeURIComponent(debouncedUsername)}`
                    );
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(
                        axiosError.response?.data.message ?? 'Error checking username'
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            } else {
                setUsernameMessage('');
            }
        };

        checkUsernameUnique();
    }, [debouncedUsername]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post<ApiResponse>('/api/signup', {
                username,
                email,
                password,
            });

            if (!response.data.success) {
                setErrorMessage(response.data.message);
                setIsSubmitting(false);
                return;
            }

            router.replace(`/verify/${encodeURIComponent(username)}`);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setErrorMessage(
                axiosError.response?.data.message ?? 'Registration failed. Please try again.'
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-xl text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Join TrueFeedback
                </h1>
                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                    Sign up to start receiving anonymous messages
                </p>

                {errorMessage && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="unique_username"
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />

                        {isCheckingUsername && (
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Checking availability...</p>
                        )}
                        {!isCheckingUsername && usernameMessage && (
                            <p
                                className={`mt-1 text-xs font-medium ${usernameMessage === 'Username is available' ||
                                    usernameMessage === 'Username is unique'
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-rose-600 dark:text-rose-400'
                                    }`}
                            >
                                {usernameMessage}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || isCheckingUsername}
                        className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}