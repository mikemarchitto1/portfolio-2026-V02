import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

    // Read env vars directly — Next.js loads .env.local automatically
    const calApiUrl = process.env.CAL_API_URL;
    const calApiKey = process.env.CAL_API_KEY;
    const eventTypeId = process.env.CAL_EVENT_TYPE_ID;

    if (!calApiUrl || !calApiKey || !eventTypeId) {
      return NextResponse.json(
        {
          error:
            "Missing required env vars: CAL_API_URL, CAL_API_KEY, CAL_EVENT_TYPE_ID",
        },
        { status: 500 }
      );
    }

    // Cal.com v1 slots endpoint expects a datetime range.
    const nextDate = addDaysYmd(date, 1);
    if (!nextDate) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }

    const startTime = `${date}T00:00:00.000Z`;
    const endTime = `${nextDate}T00:00:00.000Z`;

    const url = `${calApiUrl}/slots?eventTypeId=${encodeURIComponent(
      eventTypeId
    )}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(
      endTime
    )}&timeZone=${encodeURIComponent("UTC")}&apiKey=${encodeURIComponent(calApiKey)}`;

    const calRes = await fetch(url, {
      method: "GET",
    });

    const json = await calRes.json().catch(() => ({}));
    return NextResponse.json(json, { status: calRes.status });
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
