// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://seaglestribute.co.uk',
  // /debut-show is an unlisted invite-only page — keep it out of the sitemap
  integrations: [sitemap({ filter: (page) => !page.includes('/debut-show') })],
  vite: {
    plugins: [tailwindcss()]
  }
});