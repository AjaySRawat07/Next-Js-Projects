'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInSchema } from '@/app/schemas/signInSchema';

export default function SignInPage() {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        setErrorMessage('');

        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                setErrorMessage('Incorrect username/email or password');
            } else {
                setErrorMessage(result.error);
            }
            setIsSubmitting(false);
        }

        if (result?.url) {
            router.replace('/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-xl text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        Sign in to start receiving anonymous feedback
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="identifier"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Email or Username
                        </label>
                        <input
                            id="identifier"
                            type="text"
                            {...form.register('identifier')}
                            placeholder="username or email"
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />
                        {form.formState.errors.identifier && (
                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                                {form.formState.errors.identifier.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...form.register('password')}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400 transition-colors"
                        />
                        {form.formState.errors.password && (
                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/sign-up"
                        className="font-medium text-neutral-900 underline underline-offset-4 dark:text-white"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
