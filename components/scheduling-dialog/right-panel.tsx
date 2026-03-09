"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, ExternalLink } from "lucide-react";
import type { DayButton } from "react-day-picker";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getTimezoneOptions } from "@/lib/timezones";
import { useTheme } from "@/hooks/use-theme";

const HOST_NAME = "Michael Marchitto";
const MEETING_TITLE = "Introduction Call";
const MEETING_DURATION = "30 min";

function SchedulingCalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const isOutsideInColorMode = theme === "color" && modifiers.outside;
  const colorStyle = isOutsideInColorMode ? { color: "#ffffff" as const } : undefined;
  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-outside={modifiers.outside}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      style={colorStyle}
      className={cn(
        "rdp-day-button inline-flex items-center justify-center rounded-full transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none text-button text-foreground data-[outside=true]:bg-transparent data-[outside=true]:hover:bg-transparent color:data-[outside=true]:!text-white data-[selected-single=true]:text-white data-[range-middle=true]:text-foreground data-[range-start=true]:text-white data-[range-end=true]:text-white group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0 flex aspect-square size-auto w-full min-w-(--cell-size) leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-full data-[range-end=true]:rounded-r-full data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-full data-[range-start=true]:rounded-l-full px-0 py-0",
        className
      )}
      {...props}
    >
      <span
        style={colorStyle}
        className="flex min-h-0 min-w-0 flex-1 items-center justify-center text-center text-button"
      >
        {children}
      </span>
    </button>
  );
}

export type SchedulingStep = "time" | "details" | "confirm";

export type RightPanelProps = {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  timeFormat: "12h" | "24h";
  setTimeFormat: (f: "12h" | "24h") => void;
  slots: string[];
  timezone: string;
  theme: "light" | "dark" | "color";
  step: SchedulingStep;
  setStep: (s: SchedulingStep) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  notes?: string;
  setNotes?: React.Dispatch<React.SetStateAction<string>>;
  guests?: string[];
  setGuests?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function RightPanel({
  date,
  setDate,
  timeFormat,
  setTimeFormat,
  slots,
  timezone,
  theme,
  step,
  setStep,
  selectedTime,
  setSelectedTime,
  name: nameProp,
  setName: setNameProp,
  email: emailProp,
  setEmail: setEmailProp,
  notes: notesProp,
  setNotes: setNotesProp,
  guests: guestsProp,
  setGuests: setGuestsProp,
}: RightPanelProps) {
  const [nameLocal, setNameLocal] = React.useState("");
  const [emailLocal, setEmailLocal] = React.useState("");
  const [notesLocal, setNotesLocal] = React.useState("");
  const [guestsLocal, setGuestsLocal] = React.useState<string[]>([]);
  const name = nameProp ?? nameLocal;
  const setName = setNameProp ?? setNameLocal;
  const email = emailProp ?? emailLocal;
  const setEmail = setEmailProp ?? setEmailLocal;
  const notes = notesProp ?? notesLocal;
  const setNotes = setNotesProp ?? setNotesLocal;
  const guests = guestsProp ?? guestsLocal;
  const setGuests = setGuestsProp ?? setGuestsLocal;
  const [guestInput, setGuestInput] = React.useState("");
  const [showGuestInput, setShowGuestInput] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const timezoneOptions = React.useMemo(() => getTimezoneOptions(), []);
  const timezoneDisplayName =
    timezoneOptions.find((o) => o.value === timezone)?.displayName ?? timezone.replace(/_/g, " ");

  const selectedLabel = date
    ? `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()}`
    : "Select a date";

  const handleTimeSlotClick = (slot: string) => {
    setSelectedTime(slot);
    setStep("details");
  };

  const validate = (): boolean => {
    let ok = true;
    if (!name.trim()) {
      setNameError("Name is required");
      ok = false;
    } else setNameError("");
    if (!email.trim()) {
      setEmailError("Email is required");
      ok = false;
    } else setEmailError("");
    return ok;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    // TODO: Call Cal.com or booking API here. Stub for now.
    setStep("confirm");
  };

  const addGuest = () => {
    if (guestInput.trim()) {
      setGuests((g) => [...g, guestInput.trim()]);
      setGuestInput("");
    }
  };

  const removeGuest = (index: number) => {
    setGuests((g) => g.filter((_, i) => i !== index));
  };

  const formatDateLong = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTimeRange = (start: string) => {
    const idx = slots.indexOf(start);
    const end =
      idx >= 0 && idx < slots.length - 1 ? slots[idx + 1] : "3:00 PM";
    return `${start} - ${end}`;
  };

  const isColor = theme === "color";
  const isDark = theme === "dark";
  const textClass = "text-black dark:text-white color:text-white";
  const mutedClass = "text-white/80 dark:text-white/80 color:text-white/80";
  const confirmTextClass = "text-black";
  const confirmMutedClass = "text-black/80";

  if (step === "confirm" && date && selectedTime) {
    return (
      <Card className="confirmation-card w-full overflow-hidden rounded-lg border-0 bg-white shadow-none p-[64px]">
        <CardHeader className="gap-0 pb-3 text-left p-0">
          <div className="flex min-w-0 flex-col gap-1">
<CardTitle className={cn("text-subtitle1 font-semibold", confirmTextClass)}>
                This meeting is scheduled
              </CardTitle>
            <p className={cn("text-body2 font-normal", confirmMutedClass)}>
              We sent an email with a calendar invitation with the details to everyone.
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-0 text-left p-0">
          <div className="flex flex-col gap-1">
            <span className={cn("confirmation-section-title text-subtitle2 font-medium", confirmTextClass)}>What</span>
            <span className={cn("confirmation-section-content text-body2 font-normal", confirmMutedClass)}>
              {MEETING_TITLE} between {name || "Guest"} and {HOST_NAME}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={cn("confirmation-section-title text-subtitle2 font-medium", confirmTextClass)}>When</span>
            <div className="confirmation-section-content flex flex-col gap-0.5">
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>{formatDateLong(date)}</span>
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>
                {formatTimeRange(selectedTime)} ({timezoneDisplayName})
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className={cn("confirmation-section-title text-subtitle2 font-medium", confirmTextClass)}>Who</span>
            <div className="confirmation-section-content flex flex-col gap-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("text-body2 font-normal", confirmMutedClass)}>{name || "Guest"}</span>
                <span className="inline-flex items-center rounded-full bg-sky-400 px-2 py-0.5 text-xs font-medium text-blue-800">
                  Host
                </span>
              </div>
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>{email}</span>
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>{HOST_NAME}</span>
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>mikemarchitto@gmail.com</span>
              {guests.map((g, i) => (
                <span key={i} className={cn("text-body2 font-normal", confirmMutedClass)}>
                  {g}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className={cn("confirmation-section-title text-subtitle2 font-medium", confirmTextClass)}>Where</span>
            <div className="confirmation-section-content flex items-center gap-1.5">
              <span className={cn("text-body2 font-normal", confirmMutedClass)}>Video Call</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-black" />
            </div>
          </div>
          {notes && (
            <div className="flex flex-col gap-1">
              <span className={cn("confirmation-section-title text-subtitle2 font-medium", confirmTextClass)}>Notes</span>
              <span className={cn("confirmation-section-content text-body2 font-normal min-w-0 break-words", confirmMutedClass)}>{notes}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      data-slot="scheduling-right-panel"
      className={cn(
        "flex min-h-0 flex-1 min-w-0 flex-col",
        "lg:flex-row lg:gap-10"
      )}
    >
      <AnimatePresence mode="wait">
        {step === "time" && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-0 w-full flex-1 flex-col lg:flex-row lg:gap-10"
          >
            {/* Calendar */}
            <div
              data-slot="scheduling-calendar-wrap"
              className="flex h-auto min-h-[280px] lg:min-h-0 min-w-0 w-full max-w-full lg:w-[384px] flex-none flex-col bg-transparent overflow-visible lg:-ml-3.5"
            >
              <div className="flex min-w-0 flex-1 flex-col overflow-visible pt-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  className="rounded-none border-0 p-0 [--cell-size:2.25rem] lg:[--cell-size:3rem]"
                  classNames={{
                    caption_label:
                      "select-none text-subtitle1 text-foreground leading-8 h-8 flex items-center",
                  }}
                  components={{ DayButton: SchedulingCalendarDayButton }}
                />
              </div>
            </div>
            {/* Time slots */}
            <div className="flex h-auto min-h-0 min-w-0 shrink-0 flex-col pt-0 mt-1 lg:mt-0 w-full lg:w-[200px]">
              <div
                data-slot="scheduling-right-header"
                className="mb-4 flex items-center justify-between gap-2 rounded-none bg-transparent p-0"
              >
                <span className={cn("text-subtitle1 font-medium", textClass)}>{selectedLabel}</span>
                <Tabs value={timeFormat} onValueChange={(v) => setTimeFormat(v as "12h" | "24h")}>
                  <div
                    className="rounded-full h-8 overflow-hidden flex box-border w-fit bg-transparent"
                    data-slot="scheduling-toggle-wrap"
                  >
                    <TabsList
                      noBg
                      data-slot="scheduling-toggle"
                      className="scheduling-toggle-track h-8 w-full p-0 rounded-full border-0 shadow-none min-w-0 inline-flex flex-1 bg-transparent"
                    >
                      <TabsTrigger
                        value="12h"
                        className="text-button px-2.5 py-1 rounded-full transition-colors rounded-l-full"
                      >
                        12h
                      </TabsTrigger>
                      <TabsTrigger
                        value="24h"
                        className="text-button px-2.5 py-1 rounded-full transition-colors rounded-r-full"
                      >
                        24h
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>
              <span
                data-slot="scheduling-time-slots-label"
                className={cn("scheduling-time-slots-label mb-5 shrink-0 block w-full text-center", textClass)}
              >
                Time Slots
              </span>
              <div
                className="flex flex-col overflow-y-auto min-w-0 flex-1 min-h-0 lg:max-h-[272px]"
                data-slot="scheduling-time-slots"
              >
                <div className="flex flex-col gap-2 pt-0 pb-4 lg:pb-6">
                  {slots.map((slot) => (
                    <Button
                      key={slot}
                      variant="ghost"
                      data-slot="scheduling-time-slot-btn"
                      className="w-full justify-center rounded-full !h-[48px] !min-h-[48px] py-3 text-button"
                      onClick={() => handleTimeSlotClick(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "details" && date && selectedTime && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-0 w-full flex-1 flex-col"
          >
            <h2 className={cn("text-subtitle2 font-medium pt-1 mb-4 pl-6", textClass)}>Your Details</h2>
            <Card className="scheduling-details-card border-0 bg-transparent shadow-none py-0">
              <CardContent className="scheduling-details-content flex flex-col gap-6 pt-0">
                <div className="flex flex-col gap-2">
                  <label className={cn("scheduling-details-label block", textClass)}>
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className={cn(nameError && "border-destructive")}
                  />
                  {nameError && (
                    <span className="text-caption text-destructive">{nameError}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={cn("scheduling-details-label block", textClass)}>
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={cn(emailError && "border-destructive")}
                  />
                  {emailError && (
                    <span className="text-caption text-destructive">{emailError}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className={cn("scheduling-details-label block", textClass)}>Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please share anything that will help prepare for our meeting."
                    rows={3}
                    className={cn(
                      "scheduling-notes-field flex w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[80px]",
                      "text-black dark:text-white"
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowGuestInput(true)}
                    className="scheduling-add-guests-btn w-fit self-start !pl-0 hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add guests
                  </Button>
                  {showGuestInput && (
                    <>
                      {guests.map((g, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Input
                            value={g}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGuest(i)}
                            aria-label="Remove guest"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2 items-center w-full min-w-0">
                        <Input
                          value={guestInput}
                          onChange={(e) => setGuestInput(e.target.value)}
                          placeholder="Email"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGuest())}
                          className="flex-1 min-w-0"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={addGuest}
                          className="scheduling-add-guest-btn hover:!bg-transparent focus:!bg-transparent active:!bg-transparent !pl-0"
                        >
                          Add
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setStep("time")}>
                  Back
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
