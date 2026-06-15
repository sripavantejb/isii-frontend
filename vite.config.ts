import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), robotsTxtPlugin(mode)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
