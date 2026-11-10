"use client";

import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { MessageSquare, ShieldCheck, Zap, Heart, Mail } from "lucide-react";
import messages from "@/message.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>100% Anonymous & Secure</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-neutral-950 dark:text-white">
          Dive into the World of{" "}
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500 bg-clip-text text-transparent">
            Anonymous Feedback
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-neutral-600 dark:text-neutral-400 sm:text-lg md:text-xl leading-relaxed">
          TrueFeedback gives you a personal space where friends, colleagues, and followers
          can share genuine opinions without fear. Honest, raw, and completely private.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up">
            <Button size="lg" className="w-full sm:w-auto font-semibold">
              Get Your Personal Link
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign In to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Auto-moving Shadcn Carousel Section */}
      <section className="container mx-auto flex flex-col items-center px-4 pb-20">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <MessageSquare className="h-4 w-4" />
          <span>Live Messages Feed</span>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-md md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-lg backdrop-blur-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold text-neutral-900 dark:text-white">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Mail className="h-4 w-4 shrink-0 text-neutral-400 mt-1" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                          &ldquo;{message.content}&rdquo;
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-400">
                        <span>Anonymous</span>
                        <span>{message.received}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-12 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" />
            <CarouselNext className="-right-12 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" />
          </div>
        </Carousel>
      </section>

      {/* Feature Pillars */}
      <section className="w-full border-t border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 py-16 transition-colors">
        <div className="container mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/20 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Full Anonymity</h3>
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No tracking, no sender IPs exposed, no identity leaks. Honest feedback without hesitation.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/20 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-800">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Instant Delivery</h3>
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Messages are routed instantly to your personal dashboard with real-time inbox control.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/20 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-800">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Control Your Inbox</h3>
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Easily toggle message acceptance on or off with a single click whenever you need a break.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
