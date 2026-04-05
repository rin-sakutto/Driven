import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "../../lib/products";

/** Stripe Checkout Session を作成し、決済ページの URL を返す */
export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "決済の設定が完了していません" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(secretKey);

    const { productId, size } = await req.json();

    const product = getProduct(Number(productId));
    if (!product) {
      return NextResponse.json(
        { error: "商品が見つかりません" },
        { status: 404 },
      );
    }

    const host = req.headers.get("host") ?? "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${protocol}://${host}`;

    // "paypay" は Stripe API でサポートされているが、stripe-node の型定義に未反映のため unknown 経由でキャスト。
    const paymentMethodTypes = ["card", "paypay"] as unknown as NonNullable<
      Parameters<typeof stripe.checkout.sessions.create>[0]
    >["payment_method_types"];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price_data: {
            // PayPay は JPY のみ対応のため JPY を使用
            currency: "jpy",
            product_data: {
              name: product.name,
              description: size ? `Size: ${size}` : product.description,
            },
            // product.price の値をそのまま円単位として扱う（JPY はゼロ小数点通貨）
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { error: "決済の処理中にエラーが発生しました" },
      { status: 500 },
    );
  }
}
