"use client";

import * as React from "react";
import { CheckCircle2, ExternalLink, Mail, CalendarPlus } from "lucide-react";
import { SiGooglecalendar } from "react-icons/si";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export type ConfirmStepProps = {
  name: string;
  email: string;
  guestEmail: string;
  formattedDate: string;
  selectedSlot: string | null;
  formattedTimeZone: string;
  notes?: string;
  onReschedule: () => void;
  onCancel: () => void;
};

const ConfirmStep = React.memo(function ConfirmStep({
  name,
  email,
  guestEmail,
  formattedDate,
  selectedSlot,
  formattedTimeZone,
  notes,
  onReschedule,
  onCancel,
}: ConfirmStepProps) {
  return (
    <div className="flex w-full flex-row items-start gap-3 text-left">
      <div className="shrink-0 pt-0.5 mt-[15px]">
        <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-subtitle1 text-foreground dark:text-white color:text-white pt-0.5 mt-4">This meeting is scheduled</h2>
        <p className="text-body2 text-foreground mt-1">We sent a calendar invite with the details to everyone.</p>
        <dl className="flex flex-col gap-4 text-body2 mt-8 items-start">
          <div className="w-full">
            <dt className="text-foreground dark:text-white color:text-white font-medium">What</dt>
            <dd className="text-foreground dark:text-white color:text-white mt-0.5">Introduction Call between {name || "Guest"} and Michael Marchitto</dd>
          </div>
          <div className="w-full">
            <dt className="text-foreground dark:text-white color:text-white font-medium">When</dt>
<dd className="text-foreground dark:text-white color:text-white mt-0.5">
            {formattedDate}
              <br />
              {selectedSlot} ({formattedTimeZone})
            </dd>
          </div>
          <div className="w-full">
            <dt className="text-foreground dark:text-white color:text-white font-medium">Who</dt>
            <dd className="text-foreground dark:text-white color:text-white mt-0.5">
              <span className="inline-flex items-center gap-1">
                Michael Marchitto <span className="rounded bg-muted dark:bg-[oklch(78%_0.01_264)] color:bg-[oklch(92%_0.035_165)] text-black dark:text-[oklch(20%_0.01_264)] color:text-[oklch(24%_0.035_165)] text-xs px-1.5 py-0.5">Host</span>
              </span>
              <br />
              {email}
              {guestEmail && (
                <>
                  <br />
                  {name || "Guest"} — {guestEmail}
                </>
              )}
            </dd>
          </div>
          <div className="w-full">
            <dt className="text-foreground dark:text-white color:text-white font-medium">Where</dt>
            <dd className="text-foreground dark:text-white color:text-white mt-0.5 inline-flex items-center gap-1">
              Video Call <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </dd>
          </div>
          {notes != null && notes.trim() !== "" && (
            <div className="w-full">
              <dt className="text-foreground dark:text-white color:text-white font-medium">Notes</dt>
              <dd className="text-foreground dark:text-white color:text-white mt-0.5 whitespace-pre-wrap">{notes.trim()}</dd>
            </div>
          )}
        </dl>
        <div className="flex flex-wrap items-center justify-start gap-2 mt-14">
          <button type="button" className="text-body2 text-foreground no-underline mr-4 transition-colors hover:text-[oklch(50%_0_0)] color:hover:text-[oklch(48%_0.035_165)]" onClick={onReschedule}>Reschedule</button>
          <button type="button" className="text-body2 text-foreground no-underline transition-colors hover:text-[oklch(50%_0_0)] color:hover:text-[oklch(48%_0.035_165)]" onClick={onCancel}>Cancel</button>
          <div className="flex items-center gap-1 ml-[88px]">
            <Button variant="ghost" size="icon" className="!h-11 !min-h-11 !w-11 !min-w-11 !p-3.5 shrink-0 rounded-md border-0 bg-transparent hover:bg-[oklch(92%_0_0)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(48%_0.035_165)] transition-colors" aria-label="Google Calendar">
              <SiGooglecalendar className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!h-11 !min-h-11 !w-11 !min-w-11 !p-3.5 shrink-0 rounded-md border-0 bg-transparent hover:bg-[oklch(92%_0_0)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(48%_0.035_165)] transition-colors" aria-label="Outlook">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!h-11 !min-h-11 !w-11 !min-w-11 !p-3.5 shrink-0 rounded-md border-0 bg-transparent hover:bg-[oklch(92%_0_0)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(48%_0.035_165)] transition-colors" aria-label="Office 365">
              <CalendarPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="!h-11 !min-h-11 !w-11 !min-w-11 !p-3.5 shrink-0 rounded-md border-0 bg-transparent hover:bg-[oklch(92%_0_0)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(48%_0.035_165)] transition-colors" aria-label="ICS">
              <FiDownload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export { ConfirmStep };
