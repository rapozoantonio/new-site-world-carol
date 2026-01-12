import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["es"],

  // Used when no locale matches
  defaultLocale: "es",

  // Always use locale prefix for cleaner URLs
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es)/:path*"],
};
