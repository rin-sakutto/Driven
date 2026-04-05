import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/** 問い合わせフォームからのメール送信 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "メール送信の設定が完了していません" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "すべてのフィールドを入力してください" },
        { status: 400 },
      );
    }

    // ── メール送信 ──
    const toAddresses = (process.env.CONTACT_EMAIL ?? "delivered@resend.dev")
      .split(",")
      .map((e) => e.trim());

    // RESEND_FROM_EMAIL には Resend で検証済みのドメインのアドレスを設定すること。
    // 未設定の場合は Resend のテスト用送信者にフォールバックするが、
    // その場合は Resend アカウントの登録メールアドレス宛にしか送信できない。
    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "Driven Contact <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddresses,
      replyTo: email,
      subject: `[Driven] ${name} からの問い合わせ`,
      text: [
        `名前: ${name}`,
        `メール: ${email}`,
        ``,
        `メッセージ:`,
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "送信に失敗しました" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
