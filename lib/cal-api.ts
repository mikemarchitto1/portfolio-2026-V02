/**
 * Cal.com HTTP API v2 helpers (v1 is decommissioned).
 * @see https://cal.com/docs/api-reference/v2/v1-v2-differences
 */

/** Slots endpoint requires this header value. */
export const CAL_API_VERSION_SLOTS = "2024-09-04";

/** Create-booking endpoint (OpenAPI) uses this version. */
export const CAL_API_VERSION_BOOKINGS = "2026-02-25";

/** Normalize CAL_API_URL (often https://api.cal.com/v1) to origin without version path. */
export function getCalApiOrigin(): string {
  let base = process.env.CAL_API_URL?.trim() ?? "https://api.cal.com";
  base = base.replace(/\/v1\/?$/i, "").replace(/\/v2\/?$/i, "").replace(/\/$/, "");
  return base;
}

export function calV2Url(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getCalApiOrigin()}/v2${p}`;
}

export function calV2Headers(apiKey: string, calApiVersion: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    "cal-api-version": calApiVersion,
    "Content-Type": "application/json",
  };
}

/** Extract a user-facing message from Cal v1 or v2 error JSON bodies. */
export function calErrorMessageFromBody(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  if (typeof o.message === "string" && o.message.trim()) return o.message.trim();
  const err = o.error;
  if (typeof err === "string" && err.trim()) return err.trim();
  if (err && typeof err === "object" && err !== null) {
    const e = err as Record<string, unknown>;
    if (typeof e.message === "string" && e.message.trim()) return e.message.trim();
  }
  return null;
}
