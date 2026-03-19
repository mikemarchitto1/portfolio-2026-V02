import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function toIcsDate(dt: string): string | null {
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return null;
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid") ?? "";
  const title = searchParams.get("title") ?? "Meeting";
  const startTime = searchParams.get("startTime") ?? "";
  const endTime = searchParams.get("endTime") ?? "";
  const meetingUrl = searchParams.get("meetingUrl") ?? "";

  const dtStart = toIcsDate(startTime);
  const dtEnd = toIcsDate(endTime);
  if (!dtStart || !dtEnd) {
    return NextResponse.json(
      { error: "Missing or invalid startTime/endTime" },
      { status: 400 }
    );
  }

  const now = toIcsDate(new Date().toISOString())!;
  const calUid = uid ? `${uid}@cal.com` : `booking-${now}@local`;

  const descriptionParts: string[] = [];
  if (meetingUrl) descriptionParts.push(`Join: ${meetingUrl}`);
  const description = descriptionParts.length ? descriptionParts.join("\\n") : "";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Portfolio Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeIcsText(calUid)}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(title)}`,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : "",
    meetingUrl ? `URL:${escapeIcsText(meetingUrl)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="meeting.ics"`,
      "Cache-Control": "no-store",
    },
  });
}

