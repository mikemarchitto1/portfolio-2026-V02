import { NextRequest, NextResponse } from "next/server";
import {
  CAL_API_VERSION_SLOTS,
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

function addDaysYmd(dateYmd: string, days: number): string | null {
  const d = new Date(`${dateYmd}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return null;
  d.setUTCDate(d.getUTCDate() + days);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function POST(req: NextRequest) {
  try {
    const { date } = (await req.json().catch(() => ({}))) as { date?: string };

    if (!date || typeof date !== "string") {
      return NextResponse.json(
        { error: "Missing required field: date" },
        { status: 400 }
      );
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

    const nextDate = addDaysYmd(date, 1);
    if (!nextDate) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }

    const url = new URL(calV2Url("/slots"));
    url.searchParams.set("eventTypeId", String(eventTypeId));
    url.searchParams.set("start", date);
    url.searchParams.set("end", nextDate);
    url.searchParams.set("timeZone", "UTC");

    const calRes = await fetch(url.toString(), {
      method: "GET",
      headers: calV2Headers(calApiKey, CAL_API_VERSION_SLOTS),
    });

    const json: unknown = await calRes.json().catch(() => ({}));

    if (!calRes.ok) {
      return NextResponse.json(
        {
          error:
            calErrorMessageFromBody(json) ??
            `Cal.com returned ${calRes.status}`,
        },
        { status: calRes.status }
      );
    }

    const payload =
      json &&
      typeof json === "object" &&
      json !== null &&
      "data" in json &&
      (json as { data: unknown }).data !== undefined
        ? (json as { data: unknown }).data
        : json;

    return NextResponse.json(payload ?? {}, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to fetch availability",
      },
      { status: 500 }
    );
  }
}
