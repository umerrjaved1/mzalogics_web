import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, type FormKind } from "@/lib/forms";
import { allowRequest } from "@/lib/rate-limit";
import { forwardToWebhook, logLead } from "@/lib/lead-store";
import { checkUpload, safeFilename } from "@/lib/uploads";
import { site } from "@/lib/site";

const kinds: FormKind[] = ["contact", "talent", "rescue", "career", "estimate"];

/** An estimate capture is intentionally lighter than a full brief. */
const MIN_MESSAGE_LENGTH: Record<string, number> = { estimate: 0 };

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

type Attachment = { filename: string; content: Buffer };

/**
 * Accepts multipart (enquiry form, may carry one attachment) or JSON
 * (estimate capture). Returns plain fields plus an optional validated file.
 */
async function readSubmission(
  request: Request,
): Promise<{ fields: Record<string, string>; file?: Attachment; fileError?: string }> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    const json = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!json) return { fields: {} };
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(json)) {
      fields[key] = value == null ? "" : String(value);
    }
    return { fields };
  }

  const form = await request.formData();
  const fields: Record<string, string> = {};
  let file: Attachment | undefined;
  let fileError: string | undefined;

  for (const [key, value] of form.entries()) {
    if (typeof value === "string") {
      fields[key] = value;
      continue;
    }
    if (key !== "attachment" || value.size === 0) continue;

    // Never trust the browser: re-check name, size and type here.
    const verdict = checkUpload(value.name, value.size, value.type);
    if (!verdict.ok) {
      fileError = verdict.error;
      continue;
    }
    file = {
      filename: safeFilename(value.name),
      content: Buffer.from(await value.arrayBuffer()),
    };
  }

  return { fields, file, fileError };
}

export async function POST(request: Request) {
  const gated = allowRequest(`contact:${clientKey(request)}`);
  if (!gated.ok) {
    return NextResponse.json({ error: "Too many messages. Try WhatsApp or email us directly." }, { status: 429 });
  }

  let submission;
  try {
    submission = await readSubmission(request);
  } catch {
    return NextResponse.json({ error: "We could not read that submission." }, { status: 400 });
  }

  const { fields: body, file, fileError } = submission;

  if (!Object.keys(body).length) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (fileError) {
    return NextResponse.json({ error: fileError }, { status: 400 });
  }

  const kind = body.kind as FormKind;
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const minMessage = MIN_MESSAGE_LENGTH[kind] ?? 8;

  if (!kinds.includes(kind) || !isValidEmail(email) || message.length < minMessage) {
    return NextResponse.json({ error: "Please include a valid email and a short message." }, { status: 400 });
  }

  const record = {
    kind,
    name: body.name ?? "",
    email,
    phone: body.phone ?? "",
    company: body.company ?? "",
    role: body.role ?? "",
    stack: body.stack ?? "",
    budget: body.budget ?? "",
    timeline: body.timeline ?? "",
    track: body.track ?? body.selectedDeliveryTrack ?? "",
    projectType: body.projectType ?? body.projectTypeScope ?? "",
    estimate: body.estimate ?? "",
    plan: body.plan ?? "",
    deal: body.deal ?? "",
    attachment: file?.filename ?? "",
    message,
  };

  const lines = [
    `Kind: ${record.kind}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone}`,
    `Company: ${record.company}`,
    `Role: ${record.role}`,
    `Stack: ${record.stack}`,
    `Budget: ${record.budget}`,
    `Timeline: ${record.timeline}`,
    `Delivery track: ${record.track}`,
    `Project type: ${record.projectType}`,
    `Estimate shown: ${record.estimate}`,
    `Plan: ${record.plan}`,
    `Deal: ${record.deal}`,
    `Attachment: ${record.attachment || "none"}`,
    "",
    message || "(no message)",
  ].join("\n");

  // Primary channel: email.
  let emailed = false;
  let emailError: string | null = null;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    emailError = "RESEND_API_KEY is not configured";
    console.error(`[contact] ${emailError}`);
  } else {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? `MZA Logics <${site.email}>`,
      to: site.email,
      replyTo: email,
      subject: `[${kind}] ${site.name} website`,
      text: lines,
      ...(file ? { attachments: [{ filename: file.filename, content: file.content }] } : {}),
    });
    if (error) {
      emailError = String(error.message ?? error);
      console.error("[contact] resend failed", error);
    } else {
      emailed = true;
    }
  }

  // Backup channel, then the log. The lead is recorded either way.
  // The attachment itself cannot ride along, but its name is on the record.
  const webhooked = emailed ? false : await forwardToWebhook(record);
  const delivery = emailed ? "resend" : webhooked ? "webhook" : "log-only";
  logLead(record, delivery);

  if (emailed || webhooked) {
    return NextResponse.json({ ok: true, via: delivery });
  }

  return NextResponse.json(
    {
      error: "We could not deliver your message just now. Please WhatsApp or email us directly.",
      detail: emailError ?? undefined,
    },
    { status: 503 },
  );
}
