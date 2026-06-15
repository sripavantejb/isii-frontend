import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const DEFAULT_STATIC_ASSET_BASE_URL =
  "https://d1gbpolz5fkmu.cloudfront.net/files/isii-static";

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

// Production: allow crawling + point to the sitemap.
const PRODUCTION_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin
Allow: /privacy-policy

# Explicitly welcome the most common AI and search agents
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: Google-Extended
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: PerplexityBot
Allow: /

Sitemap: https://www.isii.global/sitemap.xml
`;

// Non-production (staging/dev): block all crawlers so the test site never gets
// indexed (avoids duplicate content and the wrong site showing up in search).
const NON_PRODUCTION_ROBOTS = `# Non-production environment — keep it out of search engines.
User-agent: *
Disallow: /
`;

// Emits the correct robots.txt into the build output based on the mode.
const robotsTxtPlugin = (mode: string): Plugin => ({
  name: "generate-robots-txt",
  apply: "build",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "robots.txt",
      source: mode === "production" ? PRODUCTION_ROBOTS : NON_PRODUCTION_ROBOTS,
    });
  },
});

const buildManifest = (staticAssetBaseUrl: string) =>
  JSON.stringify(
    {
      name: "ISII | Institute for Strategic Intelligence and Intervention",
      short_name: "ISII",
      description:
        "Understanding and shaping system-level transitions and strategic turning points affecting nations, regions, and global structures.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#000000",
      icons: [
        {
          src: `${staticAssetBaseUrl}/static/meta/icons/manifest-192.png`,
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: `${staticAssetBaseUrl}/static/meta/icons/manifest-512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    null,
    2,
  );

const manifestPlugin = (staticAssetBaseUrl: string): Plugin => ({
  name: "generate-manifest-json",
  configureServer(server) {
    server.middlewares.use("/manifest.json", (_request, response) => {
      response.setHeader("Content-Type", "application/manifest+json");
      response.end(buildManifest(staticAssetBaseUrl));
    });
  },
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "manifest.json",
      source: buildManifest(staticAssetBaseUrl),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const staticAssetBaseUrl = normalizeBaseUrl(
    env.VITE_STATIC_ASSET_BASE_URL || DEFAULT_STATIC_ASSET_BASE_URL,
  );

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), robotsTxtPlugin(mode), manifestPlugin(staticAssetBaseUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
