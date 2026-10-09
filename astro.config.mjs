// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { parse } from 'yaml';

// The production URL lives in client/facts.yaml with the rest of the client's facts.
const { site } = parse(readFileSync(new URL('./client/facts.yaml', import.meta.url), 'utf8'));

/** Pages that exist for the team, not for search. Kept out of the sitemap; they also carry noindex. */
const internal = ['/kit', '/404', '/enquiry-sent'];

export default defineConfig({
  site: site.url,
  // /rooms, never /rooms/ or /rooms.html. vercel.json matches this (cleanUrls, trailingSlash: false).
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    // React only hydrates islands (the enquiry form). Pages ship no framework JS.
    react(),
    sitemap({
      filter: (page) => !internal.includes(new URL(page).pathname),
    }),
  ],
  // Self-hosted at build time with metric-matched fallbacks, so text does not jump when the font loads.
  // Static weights only, and only the ones the design uses: Newsreader 400, Instrument Sans 400 and 600.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Newsreader',
      cssVariable: '--font-display-face',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Instrument Sans',
      cssVariable: '--font-text-face',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
