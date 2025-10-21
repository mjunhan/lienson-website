import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["vi", "zh", "ko"],
  defaultLocale: "vi",
  localePrefix: "always",
});

export default intlMiddleware;

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
