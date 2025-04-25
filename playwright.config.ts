import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 100 * 1000,
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 },
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
        headless: false,
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
      },
    },
  ],
});