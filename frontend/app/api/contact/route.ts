import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL!;

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetAt) {
      rateLimit.delete(key);
    }
  }
}, 60 * 1000);

function sanitize(str: string): string {
  return str.replace(/[<>&"']/g, (c) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#x27;",
    };
    return entities[c] || c;
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Reject oversized payloads (10KB max)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 10240) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return NextResponse.json({ error: "Name is required (max 100 chars)." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
    return NextResponse.json(
      { error: "Message is required (max 2000 chars)." },
      { status: 400 }
    );
  }

  const cleanName = sanitize(name.trim());
  const cleanEmail = sanitize(email.trim());
  const cleanMessage = sanitize(message.trim());

  // Validate IP format before storing (prevent header injection)
  const cleanIp = /^[\d.:a-fA-F]+$/.test(ip) ? ip : "unknown";

  // Store in Supabase
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    ip: cleanIp,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Send email notification
  const { error: emailError } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    subject: `New message from ${cleanName}`,
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
  });

  if (emailError) {
    // Submission is saved in DB — just log the email failure
    console.error("Resend email error:", emailError);
  }

  return NextResponse.json({ success: true });
}
