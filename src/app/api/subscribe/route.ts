/* eslint-disable sonarjs/slow-regex */
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";
import crypto from "node:crypto";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!,
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skillpack.co";
const HMAC_SECRET = process.env.AUTH_SECRET ?? "skillpack-unsub";

export function makeUnsubToken(email: string) {
  return crypto.createHmac("sha256", HMAC_SECRET).update(email).digest("hex").slice(0, 32);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Rate limit: 5 subscribes per IP per hour
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const rateKey = `subscribe:rate:${ip}`;
    const count = await redis.incr(rateKey);

    if (count === 1) {
      await redis.expire(rateKey, 3600);
    }

    if (count > 5) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    // Check if already subscribed
    const alreadySubscribed = await redis.sismember("subscribers:emails", email);

    if (alreadySubscribed) {
      return NextResponse.json({ error: "You're already subscribed." }, { status: 409 });
    }

    // Create contact in Mailjet
    try {
      await mailjet.post("contact").request({ Email: email });
    } catch (err: any) {
      if (err?.statusCode !== 400) throw err;
    }

    // Store subscriber
    await redis.sadd("subscribers:emails", email);

    // Send welcome email
    const unsubToken = makeUnsubToken(email);
    const unsubUrl = `${SITE_URL}/changelog?unsubscribe=1&email=${encodeURIComponent(email)}&token=${unsubToken}`;

    const sendResult = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: "changelog@skillpack.co", Name: "SkillPack" },
          To: [{ Email: email }],
          Subject: "You're subscribed to SkillPack Changelog",
          Headers: {
            "List-Unsubscribe": `<${unsubUrl}>, <mailto:changelog@skillpack.co?subject=unsubscribe>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
          HTMLPart: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 0;">
              <h2 style="font-size: 18px; font-weight: 700; color: #0a0a0a; margin: 0 0 12px;">
                You're in.
              </h2>
              <p style="font-size: 14px; color: #525252; line-height: 1.6; margin: 0 0 24px;">
                You'll get notified when something major shifts in the agentic tools leaderboard — new contenders, ranking changes, and score updates.
              </p>
              <a href="${SITE_URL}/changelog" style="display: inline-block; background: #0a0a0a; color: #fff; font-size: 13px; font-weight: 600; padding: 10px 20px; text-decoration: none; letter-spacing: 0.5px;">
                VIEW CHANGELOG
              </a>
              <p style="font-size: 11px; color: #a3a3a3; margin-top: 32px; line-height: 1.5;">
                Don't want these emails?
                <a href="${unsubUrl}" style="color: #a3a3a3; text-decoration: underline;">Unsubscribe</a>
              </p>
            </div>
          `,
          TextPart: `You're subscribed to SkillPack Changelog. You'll get notified on major leaderboard shifts.\n\nView changelog: ${SITE_URL}/changelog\n\nUnsubscribe: ${unsubUrl}`,
        },
      ],
    });

    const sendBody = sendResult.body as Record<string, unknown>;
    const messages = sendBody?.Messages as Array<Record<string, unknown>> | undefined;

    console.warn("[subscribe] Mailjet send response:", JSON.stringify(messages, null, 2));

    if (messages?.[0]?.Status === "error") {
      console.error("[subscribe] Mailjet send failed:", messages[0].Errors);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
