"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog({
  open,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="rounded-3xl">

        <div className="py-10 text-center">

          <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />

          <h2 className="mt-6 text-3xl font-bold">
            Report Submitted
          </h2>

          <p className="mt-4 text-muted-foreground">
            Your civic report has been submitted successfully.
          </p>

          <div className="mt-8 rounded-2xl bg-green-100 p-6 dark:bg-green-900/30">

            <p className="text-2xl font-bold text-green-600">
              +10 XP
            </p>

            <p className="mt-2">
              Thanks for improving your community 🎉
            </p>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}