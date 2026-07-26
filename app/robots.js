export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/agent-login", "/agent/", "/admin", "/admin/"],
    },
    sitemap: "https://u2travels.com.my/sitemap.xml",
  };
}
