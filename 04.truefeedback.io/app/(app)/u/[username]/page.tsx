"use client";

import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { Sparkles, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { messageSchema } from "@/app/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const DEFAULT_SUGGESTIONS = [
  "What is a personal project or goal you're secretly working on right now?",
  "What is the best piece of advice you've ever received and still follow?",
  "If you could master any skill overnight, what would it be and why?",
];

function SendMessageForm() {
  const params = useParams<{ username: string }>();
  const rawUsername = params.username || "";
  const username = decodeURIComponent(rawUsername);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
  const messageContent = watch("content");

  // Handle message submission
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });

      setStatusMessage({
        type: "success",
        text: response.data.message || "Message sent successfully!",
      });
      form.reset({ content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMsg =
        axiosError.response?.data.message ??
        "Failed to send message. Please try again.";

      setStatusMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch AI suggested messages
  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    setStatusMessage(null);

    try {
      const response = await axios.post("/api/suggest-messages", {}, {
        responseType: "text",
      });

      const rawText = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
      const parsedQuestions = rawText
        .split("||")
        .map((q) => q.trim())
        .filter((q) => q.length > 5);

      if (parsedQuestions.length > 0) {
        setSuggestedMessages(parsedQuestions);
      }
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      // Seamless fallback if API key is not configured
      setSuggestedMessages(DEFAULT_SUGGESTIONS);
    } finally {
      setIsSuggestLoading(false);
    }
  };

  // Click suggestion to autofill textarea
  const handleSelectSuggestion = (question: string) => {
    setValue("content", question, { shouldValidate: true });
  };

  return (
    <div className="container mx-auto my-12 max-w-4xl px-4 md:px-8 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Public Profile Link
        </h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Send an anonymous, untraceable message directly to{" "}
          <span className="font-semibold text-neutral-900 dark:text-white">@{username}</span>
        </p>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`mb-6 flex items-center gap-2.5 rounded-xl border p-4 text-sm shadow-xs transition-colors ${statusMessage.type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
            }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          )}
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Message Submission Form */}
      <Card className="border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 mb-10 transition-colors">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="content"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2.5"
              >
                Send Anonymous Message to @{username}
              </label>
              <Textarea
                id="content"
                rows={4}
                {...register("content")}
                placeholder="Write your anonymous message here... (10 to 300 characters)"
                className="resize-none font-sans border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
              <div className="flex justify-between items-center mt-2">
                {errors.content ? (
                  <p className="text-xs text-red-500 dark:text-red-400">{errors.content.message}</p>
                ) : (
                  <span className="text-xs text-neutral-500">
                    Your identity remains 100% confidential.
                  </span>
                )}
                <span
                  className={`text-xs ${messageContent.length > 300
                    ? "text-red-500 font-bold"
                    : "text-neutral-400"
                    }`}
                >
                  {messageContent.length}/300
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || messageContent.trim().length < 10}
                className="w-full sm:w-auto px-8 py-2.5 font-semibold flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send It</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* AI Suggested Messages Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Suggest Messages</span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Click on any message below to select it or generate fresh ideas
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchSuggestedMessages}
            disabled={isSuggestLoading}
            className="flex items-center gap-1.5 text-xs text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white shadow-xs"
          >
            {isSuggestLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            )}
            <span>Suggest Messages</span>
          </Button>
        </div>

        <Card className="border border-neutral-200 bg-neutral-50/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/40 shadow-xs transition-colors">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2.5">
            {suggestedMessages.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSuggestion(question)}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-left text-sm text-neutral-800 shadow-2xs transition hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80 focus:outline-none"
              >
                &ldquo;{question}&rdquo;
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      {/* Call to action for the visitor */}
      <div className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-neutral-100/80 p-8 text-center shadow-xs dark:border-neutral-800 dark:from-neutral-900/40 dark:to-neutral-950 backdrop-blur transition-colors">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Get Your Own Feedback Board</h3>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Create your account today and receive honest thoughts, questions, and compliments
          from your friends and audience.
        </p>
        <div className="mt-5">
          <Link href="/sign-up">
            <Button variant="default" size="sm" className="font-semibold">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PublicProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-neutral-400 text-sm">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading profile...
        </div>
      }
    >
      <SendMessageForm />
    </Suspense>
  );
}

