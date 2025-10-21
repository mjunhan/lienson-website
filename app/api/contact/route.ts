import { NextResponse } from "next/server";
import { contactSchema, sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Invalid payload",
      },
      { status: 400 }
    );
  }

  try {
    const result = await sendContactEmail(parsed.data);

    if ("skipped" in result && result.skipped) {
      return NextResponse.json({
        ok: true,
        message: "Email service not configured; request logged.",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      { ok: false, message: "Unable to process request" },
      { status: 500 }
    );
  }
}
