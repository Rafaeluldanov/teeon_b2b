import { defineConfig, devices } from '@playwright/test';

// Variant of playwright.config.ts used to run tests against an already-running server
// (so we don't need to spin up `npm run dev`). Used in the branding-samples task validation.

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001',
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
