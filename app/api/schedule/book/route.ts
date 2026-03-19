import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function getCalEnv() {
  const env = {
    calApiUrl: process.env.CAL_API_URL,
    calApiKey: process.env.CAL_API_KEY,
    eventTypeId: process.env.CAL_EVENT_TYPE_ID,
  };

  const missing: string[] = [];
  if (!env.calApiUrl) missing.push("CAL_API_URL");
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

    const { calApiUrl, calApiKey, eventTypeId, missing } = getCalEnv();
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required env vars: ${missing.join(", ")}`,
          missingEnvVars: missing,
        },
        { status: 500 }
      );
    }
    if (!calApiUrl || !calApiKey || !eventTypeId) {
      return NextResponse.json({ error: "Missing required env vars." }, { status: 500 });
    }

    // Cal.com v1 expects apiKey as a query param.
    const url = `${calApiUrl}/bookings?apiKey=${encodeURIComponent(calApiKey)}`;

    const calPayload = {
      eventTypeId: Number(eventTypeId),
      start,
      timeZone: typeof timeZone === "string" && timeZone.trim() ? timeZone.trim() : "America/New_York",
      language: "en",
      metadata: {},
      responses: {
        name,
        email,
        location: {
          // Event type `4968537` uses Daily: `locations: [{ type: "integrations:daily" }]`
          value: "integrations:daily",
          optionValue: "",
        },
      },
      title: `Introduction Call between ${name} and Michael Marchitto`,
      description: notes && notes.trim() ? notes.trim() : null,
    };

    const calRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calPayload),
    });

    const json = await calRes.json().catch(() => ({}));
    return NextResponse.json(json, { status: calRes.status });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

