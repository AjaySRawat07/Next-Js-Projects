"use client";

import React from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Message } from "@/app/model/User";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const messageId = (message._id as unknown as string) || message._id.toString();
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${messageId}`
      );
      if (response.data.success) {
        onMessageDelete(messageId);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Card className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-xs transition hover:border-neutral-300 dark:hover:border-neutral-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base font-medium leading-relaxed text-neutral-900 dark:text-neutral-100">
            {message.content}
          </CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-lg opacity-90 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this anonymous
                  message from your inbox.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          {new Date(message.createdAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      </CardContent>
    </Card>
  );
}
