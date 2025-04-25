import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 1000 * 1000,
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1440, height: 900 },
        actionTimeout: 100000,
        ignoreHTTPSErrors: false,
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 15 Pro Max'],
        headless: false,
        actionTimeout: 100000,
        ignoreHTTPSErrors: true,
      },
    },
  ],
});