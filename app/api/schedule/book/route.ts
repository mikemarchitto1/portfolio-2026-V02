import { NextRequest, NextResponse } from "next/server";
import {
  CAL_API_VERSION_BOOKINGS,
  calErrorMessageFromBody,
  calV2Headers,
  calV2Url,
} from "@/lib/cal-api";

export const runtime = "nodejs";

function getCalEnv() {
  const env = {
    calApiKey: process.env.CAL_API_KEY,
    eventTypeId: process.env.CAL_EVENT_TYPE_ID,
  };

  const missing: string[] = [];
  if (!env.calApiKey) missing.push("CAL_API_KEY");
  if (!env.eventTypeId) missing.push("CAL_EVENT_TYPE_ID");
  return { ...env, missing };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      start?: string;
      name?: string;
      email?: string;
      notes?: string;
      timeZone?: string;
    };

    const { start, name, email, notes, timeZone } = body;
    if (!start || typeof start !== "string") {
      return NextResponse.json({ error: "Missing required field: start" }, { status: 400 });
    }
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
    }

    const { calApiKey, eventTypeId, missing } = getCalEnv();
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required env vars: ${missing.join(", ")}`,
          missingEnvVars: missing,
        },
        { status: 500 }
      );
    }
    if (!calApiKey || !eventTypeId) {
      return NextResponse.json({ error: "Missing required env vars." }, { status: 500 });
    }

    const tz =
      typeof timeZone === "string" && timeZone.trim()
        ? timeZone.trim()
        : "America/New_York";

    const calPayload: Record<string, unknown> = {
      eventTypeId: Number(eventTypeId),
      start,
      attendee: {
        name,
        email,
        timeZone: tz,
        language: "en",
      },
      metadata: {},
    };

    if (notes && notes.trim()) {
      (calPayload.metadata as Record<string, string>).notes = notes.trim();
    }

    const calRes = await fetch(calV2Url("/bookings"), {
      method: "POST",
      headers: calV2Headers(calApiKey, CAL_API_VERSION_BOOKINGS),
      body: JSON.stringify(calPayload),
    });

    const json: unknown = await calRes.json().catch(() => ({}));

    if (!calRes.ok) {
      return NextResponse.json(
        {
          error: calErrorMessageFromBody(json) ?? `Cal.com returned ${calRes.status}`,
        },
        { status: calRes.status }
      );
    }

    const root = json && typeof json === "object" ? (json as Record<string, unknown>) : {};
    const booking =
      root.data && typeof root.data === "object"
        ? (root.data as Record<string, unknown>)
        : root;

    const uid = typeof booking.uid === "string" ? booking.uid : undefined;
    const startVal = typeof booking.start === "string" ? booking.start : undefined;
    const endVal = typeof booking.end === "string" ? booking.end : undefined;
    const titleVal = typeof booking.title === "string" ? booking.title : undefined;
    const meetingUrlRaw = booking.meetingUrl;
    const locationRaw = booking.location;
    const meetingUrl =
      typeof meetingUrlRaw === "string"
        ? meetingUrlRaw
        : typeof locationRaw === "string"
          ? locationRaw
          : undefined;

    const normalized = {
      ...root,
      booking,
      uid,
      startTime: startVal,
      endTime: endVal,
      title: titleVal,
      meetingUrl,
      eventType: booking.eventType,
    };

    return NextResponse.json(normalized, { status: calRes.status });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
