/**
 * Builds a list of timezone options with labels like "America/New York GMT -4:00".
 * Uses Intl.supportedValuesOf('timeZone') when available; falls back to a minimal list.
 */
function getTimezoneOffset(zone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    if (tzPart?.value) {
      // "GMT-4" -> "GMT -4:00"; "GMT+5:30" -> "GMT +5:30"
      const match = tzPart.value.match(/GMT([+-])(\d+)(?::(\d{2}))?/);
      if (match) {
        const sign = match[1];
        const h = match[2];
        const m = match[3] ?? "00";
        return `GMT ${sign}${h}:${m}`;
      }
      return tzPart.value;
    }
  } catch {
    // ignore invalid zone
  }
  return "";
}

export type TimezoneOption = { value: string; label: string; displayName: string };

let cachedOptions: TimezoneOption[] | null = null;

export function getTimezoneOptions(): TimezoneOption[] {
  if (cachedOptions) return cachedOptions;

  let zones: string[] = [];
  if (typeof Intl.supportedValuesOf === "function") {
    try {
      zones = Intl.supportedValuesOf("timeZone") as string[];
    } catch {
      zones = [];
    }
  }

  if (zones.length === 0) {
    zones = [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Phoenix",
      "America/Anchorage",
      "Pacific/Honolulu",
      "UTC",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Australia/Sydney",
    ];
  }

  cachedOptions = zones.map((value) => {
    const displayName = value.replace(/_/g, " ");
    const offset = getTimezoneOffset(value);
    const label = offset ? `${displayName} ${offset}` : displayName;
    return { value, label, displayName };
  });

  return cachedOptions;
}

export const DEFAULT_TIMEZONE = "America/New_York";
