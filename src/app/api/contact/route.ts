import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, type FormKind } from "@/lib/forms";
import { allowRequest } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const kinds: FormKind[] = ["contact", "talent", "rescue", "career"];

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const gated = allowRequest(`contact:${clientKey(request)}`);
  if (!gated.ok) {
    return NextResponse.json({ error: "Too many messages. Try WhatsApp or email us directly." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const kind = body.kind as FormKind;
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!kinds.includes(kind) || !isValidEmail(email) || message.length < 8) {
    return NextResponse.json({ error: "Please include a valid email and a short message." }, { status: 400 });
  }

  const lines = [
    `Kind: ${kind}`,
    `Name: ${body.name ?? ""}`,
    `Email: ${email}`,
    `Phone: ${body.phone ?? ""}`,
    `Company: ${body.company ?? ""}`,
    `Role: ${body.role ?? ""}`,
    `Stack: ${body.stack ?? ""}`,
    `Delivery track: ${body.track ?? body.selectedDeliveryTrack ?? ""}`,
    `Project type: ${body.projectType ?? body.projectTypeScope ?? ""}`,
    `Plan: ${body.plan ?? ""}`,
    `Deal: ${body.deal ?? ""}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email is temporarily unavailable. Use WhatsApp or email us directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? `MZA Logics <${site.email}>`,
    to: site.email,
    replyTo: email,
    subject: `[${kind}] ${site.name} website`,
    text: lines,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Email provider failed. Use WhatsApp or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, via: "resend" });
}
