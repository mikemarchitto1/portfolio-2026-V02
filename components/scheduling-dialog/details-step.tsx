"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type DetailsStepProps = {
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showAddGuestInput: boolean;
  onToggleAddGuest: () => void;
  guestEmail: string;
  onGuestEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onConfirm: () => void;
};

const DetailsStep = React.memo(function DetailsStep({
  name,
  onNameChange,
  email,
  onEmailChange,
  notes,
  onNotesChange,
  showAddGuestInput,
  onToggleAddGuest,
  guestEmail,
  onGuestEmailChange,
  onBack,
  onConfirm,
}: DetailsStepProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-subtitle1 font-medium text-foreground dark:text-white color:text-white mb-4">Your Details</h2>
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="scheduling-name" className="block text-subtitle2 text-foreground mb-1.5">Name *</label>
          <Input
            id="scheduling-name"
            placeholder="Enter your name"
            value={name}
            onChange={onNameChange}
            className="w-full dark:bg-[oklch(22%_0.01_264)] dark:border-[oklch(30%_0.01_264)] dark:text-white dark:placeholder:text-[oklch(70%_0.01_264)]"
          />
        </div>
        <div>
          <label htmlFor="scheduling-email" className="block text-subtitle2 text-foreground mb-1.5">Email *</label>
          <Input
            id="scheduling-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={onEmailChange}
            className="w-full dark:bg-[oklch(22%_0.01_264)] dark:border-[oklch(30%_0.01_264)] dark:text-white dark:placeholder:text-[oklch(70%_0.01_264)]"
          />
        </div>
        <div>
          <label htmlFor="scheduling-notes" className="block text-subtitle2 text-foreground mb-1.5">Notes</label>
          <Textarea
            id="scheduling-notes"
            placeholder="Please share anything that would be helpful for our meeting like context or topics to focus on."
            value={notes}
            onChange={onNotesChange}
            className="w-full min-h-[80px] dark:bg-[oklch(22%_0.01_264)] dark:border-[oklch(30%_0.01_264)] dark:text-white dark:placeholder:text-[oklch(70%_0.01_264)]"
          />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-body2 text-foreground transition-colors hover:text-[oklch(50%_0_0)] self-start"
          onClick={onToggleAddGuest}
        >
          <UserPlus className="h-4 w-4 shrink-0" />
          Add guests
        </button>
        {showAddGuestInput && (
          <div>
            <Input
              placeholder="Enter email"
              value={guestEmail}
              onChange={onGuestEmailChange}
              className="w-full dark:bg-[oklch(22%_0.01_264)] dark:border-[oklch(30%_0.01_264)] dark:text-white dark:placeholder:text-[oklch(70%_0.01_264)]"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-8 justify-end">
        <Button variant="outline" className="text-button flex-1 min-w-0 border-0 hover:bg-[oklch(100%_0.002_286)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(42%_0.035_165)]" onClick={onBack}>Back</Button>
        <Button
          className="flex-1 min-w-0 text-[length:var(--text-button)] leading-[var(--line-height-button)] font-[var(--font-weight-button)] border border-[oklch(100%_0.002_286)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(42%_0.035_165)] bg-[oklch(100%_0.002_286)] hover:bg-[oklch(100%_0.002_286)] dark:bg-[oklch(64%_0.01_264)] dark:hover:bg-[oklch(68%_0.01_264)] color:bg-[oklch(76%_0.035_165)] color:hover:bg-[oklch(80%_0.035_165)] !text-black"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
});

export { DetailsStep };
