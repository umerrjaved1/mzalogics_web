import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, type FormKind } from "@/lib/forms";
import { site } from "@/lib/site";

const kinds: FormKind[] = ["contact", "talent", "rescue", "career"];

export async function POST(request: Request) {
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
    `Company: ${body.company ?? ""}`,
    `Phone: ${body.phone ?? ""}`,
    `Role: ${body.role ?? ""}`,
    `Stack: ${body.stack ?? ""}`,
    `Delivery track: ${body.track ?? ""}`,
    `Plan: ${body.plan ?? ""}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[contact fallback]", lines);
    return NextResponse.json({ ok: true, via: "console" });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "MZA Logics <Mzalogics@gmail.com>",
    to: site.email,
    replyTo: email,
    subject: `[${kind}] ${site.name} website`,
    text: lines,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Email provider failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, via: "resend" });
}
