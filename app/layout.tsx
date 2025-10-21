import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lienson.vn"),
  title: {
    default: "Chăn ga gối đệm Liên Sơn",
    template: "%s | Liên Sơn Bedding",
  },
  description:
    "Mang giấc ngủ êm ái đến gia đình bạn với bộ sưu tập chăn ga gối đệm thiên nhiên, hiện đại từ Liên Sơn.",
  keywords: [
    "chăn ga gối đệm",
    "Liên Sơn",
    "nội thất phòng ngủ",
    "chăn ga cao cấp",
  ],
  openGraph: {
    title: "Chăn ga gối đệm Liên Sơn",
    description:
      "Thương hiệu chăn ga gối đệm thiên nhiên, hiện đại, ấm áp dành cho gia đình Việt.",
    url: "https://lienson.vn",
    siteName: "Liên Sơn Bedding",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chăn ga gối đệm Liên Sơn",
    description:
      "Mang giấc ngủ êm ái đến gia đình bạn với chất lượng chăn ga gối đệm Liên Sơn.",
  },
  authors: [{ name: "Liên Sơn" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={beVietnam.className}
      suppressHydrationWarning
    >
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
