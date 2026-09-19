/**
 * Last line of defence for an enquiry.
 *
 * Email is the primary channel, but a missing API key or a provider outage
 * used to mean the lead was gone with no record anywhere. Every lead now also
 * goes to an optional webhook and, always, to the server log in a single
 * greppable line — so a lost enquiry can be recovered from the host's logs.
 */

export type LeadRecord = Record<string, unknown>;

/** Prefix to grep for in host logs when recovering a lead. */
export const LEAD_LOG_PREFIX = "[lead]";

/**
 * POST the lead to LEAD_WEBHOOK_URL (Slack, Zapier, Make, n8n, anything that
 * accepts JSON). Returns false when unset or unreachable — never throws.
 */
export async function forwardToWebhook(record: LeadRecord): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error(`${LEAD_LOG_PREFIX} webhook failed`, error);
    return false;
  }
}

/**
 * Always record the lead, whatever else happened. Written as one JSON line so
 * it survives log aggregation and can be grepped back out.
 */
export function logLead(record: LeadRecord, delivery: string) {
  try {
    console.log(`${LEAD_LOG_PREFIX} ${JSON.stringify({ ...record, delivery, at: new Date().toISOString() })}`);
  } catch {
    // A lead must never be lost to a serialisation edge case.
    console.log(`${LEAD_LOG_PREFIX} unserialisable lead, delivery=${delivery}`);
  }
}
