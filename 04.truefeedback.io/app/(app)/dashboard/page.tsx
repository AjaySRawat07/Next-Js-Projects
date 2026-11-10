"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Copy, Check, RotateCw, Loader2 } from "lucide-react";
import { Message } from "@/app/model/User";
import { acceptMessageSchema } from "@/app/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { data: session } = useSession();

  // React Hook Form for message acceptance switch
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  // Fetch current message acceptance toggle status
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue(
        "acceptMessages",
        response.data.isAcceptingMessages ?? false
      );
    } catch (error) {
      console.error("Failed to fetch message settings:", error);
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // Fetch messages from database
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          setFeedbackMessage("Messages refreshed successfully");
          setTimeout(() => setFeedbackMessage(null), 3000);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  // Initial load when session is available
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  // Handle Switch change with Optimistic UI update
  const handleSwitchChange = async () => {
    const nextState = !acceptMessages;
    setValue("acceptMessages", nextState); // Optimistic UI update

    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: nextState,
      });

      if (!response.data.success) {
        setValue("acceptMessages", !nextState); // Rollback on failure
      }
    } catch (error) {
      setValue("acceptMessages", !nextState); // Rollback on failure
      console.error("Error updating message settings:", error);
    }
  };

  // Optimistic UI removal for message deletion
  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.filter((message) => {
        const id =
          (message._id as unknown as string) || message._id.toString();
        return id !== messageId;
      })
    );
  };

  const username = (session?.user as User)?.username;
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";
  const profileUrl = `${baseUrl}/u/${username || ""}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!session || !session.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-neutral-500 dark:text-neutral-400">
        Please sign in to access your dashboard.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 max-w-6xl px-4 md:px-8 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Dashboard Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-neutral-900 dark:text-white">
        User Dashboard
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
        Manage your anonymous public link, message acceptance, and feedback inbox.
      </p>

      {/* Copy Unique Link Card */}
      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/60 backdrop-blur transition-colors">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Copy Your Unique Link
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={profileUrl}
            disabled
            readOnly
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-mono text-neutral-800 select-all focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300 transition-colors"
          />
          <Button
            onClick={copyToClipboard}
            className="w-full sm:w-auto shrink-0 flex items-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Toggle Message Acceptance Switch */}
      <div className="mb-6 flex items-center gap-3">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Accept Messages:{" "}
          <strong
            className={acceptMessages ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-500"}
          >
            {acceptMessages ? "On" : "Off"}
          </strong>
        </span>
      </div>

      <Separator className="my-6" />

      {/* Messages Header & Refresh Control */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Your Anonymous Messages</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Real-time messages sent by your audience
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-500 dark:text-neutral-400" />
          ) : (
            <RotateCw className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
          )}
          <span>Refresh</span>
        </Button>
      </div>

      {feedbackMessage && (
        <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 p-2.5 text-xs text-emerald-700 dark:text-emerald-300 text-center">
          {feedbackMessage}
        </div>
      )}

      {/* Messages Grid */}
      {isLoading && messages.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100/50 dark:border-neutral-800/80 dark:bg-neutral-900/30 p-12 text-neutral-500 dark:text-neutral-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">Loading your messages...</p>
        </div>
      ) : messages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {messages.map((message) => {
            const messageId =
              (message._id as unknown as string) || message._id.toString();
            return (
              <MessageCard
                key={messageId}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-neutral-500">
          <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">
            No messages to display yet
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Share your profile link above on Instagram, Twitter, or WhatsApp to start
            receiving feedback!
          </p>
        </div>
      )}
    </div>
  );
}
