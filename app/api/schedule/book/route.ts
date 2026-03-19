import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const runtime = "nodejs";

let cachedFileEnv: Record<string, string> | null = null;
const ENV_FILE_NAME = ".env.local";

function parseEnvFile(contents: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = contents.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    out[key] = value;
  }
  return out;
}

async function getEnvFromFile(key: string): Promise<string | undefined> {
  if (cachedFileEnv == null) {
    try {
      const tryRead = async (envPath: string): Promise<string | null> => {
        try {
          return await fs.readFile(envPath, "utf8");
        } catch {
          return null;
        }
      };

      // Try from cwd first (common case).
      let raw = await tryRead(path.resolve(process.cwd(), ENV_FILE_NAME));

      // If Next executed this from a compiled `.next/server/...` path, climb up
      // until we find `.env.local`.
      if (!raw) {
        let dir = path.dirname(fileURLToPath(import.meta.url));
        for (let i = 0; i < 50; i++) {
          const candidate = path.resolve(dir, ENV_FILE_NAME);
          raw = await tryRead(candidate);
          if (raw) break;
          const parent = path.dirname(dir);
          if (parent === dir) break;
          dir = parent;
        }
      }

      if (!raw) throw new Error("No .env.local found");
      const parsed = parseEnvFile(raw);
      if (Object.keys(parsed).length === 0) throw new Error("Empty .env.local");
      cachedFileEnv = parsed;
    } catch {
      // Don't cache failures; Next dev may start before `.env.local` is available.
      cachedFileEnv = null;
    }
  }
  return cachedFileEnv ? cachedFileEnv[key] : undefined;
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

    const calApiUrl = process.env.CAL_API_URL ?? (await getEnvFromFile("CAL_API_URL"));
    const calApiKey = process.env.CAL_API_KEY ?? (await getEnvFromFile("CAL_API_KEY"));
    const eventTypeId =
      process.env.CAL_EVENT_TYPE_ID ?? (await getEnvFromFile("CAL_EVENT_TYPE_ID"));

    if (!calApiUrl || !calApiKey || !eventTypeId) {
      return NextResponse.json(
        { error: "Missing required env vars: CAL_API_URL, CAL_API_KEY, CAL_EVENT_TYPE_ID" },
        { status: 500 }
      );
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

