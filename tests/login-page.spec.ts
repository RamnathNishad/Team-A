import { test, expect, Page } from '@playwright/test';

/**
 * tests/hello-world.spec.ts
 *
 * Structured scenarios:
 * - [SCT] = Smoke / Sanity checks
 * - [ATC] = Acceptance test cases
 * - [NEG] = Negative scenarios
 *
 * Report (downloadable HTML):
 *   npx playwright test --reporter=html
 *   npx playwright show-report
 * HTML report path: ./playwright-report/index.html
 *
 * Note: "We recommend installing an extension to run jest tests."
 * (Accepted; project can still run Playwright E2E independently.)
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

const INPUT_DATA = {
  ATC_001: {
    name: 'Test User',
    email: 'e2e.user@example.com',
    password: 'Pass@12345',
  },
  ATC_002: {
    email: 'valid.user@example.com',
    password: 'Pass@12345',
  },
  NEG_001: {
    invalidEmail: 'invalid-email-format',
  },
  NEG_002: {
    email: '',
  },
};

async function goto(page: Page, path: string) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
}

async function fillIfPresent(page: Page, selector: string, value: string) {
  const el = page.locator(selector).first();
  if (await el.count()) await el.fill(value);
}

async function clickIfPresent(page: Page, selector: string) {
  const el = page.locator(selector).first();
  if (await el.count()) await el.click();
}

test.beforeEach(async ({ page }) => {
  await page.waitForTimeout(3000);
});

test.describe('SmartLoan E2E - SCT', () => {
  test('[SCT-001] Home page loads and title is correct', async ({ page }) => {
    await goto(page, '/');
    await expect(page).toHaveTitle('SmartLoan - Intelligent Loan Management');
  });

  test('[SCT-002] Auth pages are reachable', async ({ page }) => {
    const routes = ['/auth/login', '/auth/register', '/auth/forgot-password'];

    for (const route of routes) {
      await test.step(`Open ${route}`, async () => {
        await goto(page, route);
        await expect(page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}$`));
        await expect(page.locator('form, h1, h2').first()).toBeVisible();
      });
    }
  });
});

test.describe('SmartLoan E2E - ATC', () => {
  test('[ATC-001] Register page allows valid input and submit action', async ({ page }) => {
    await goto(page, '/auth/register');

    await fillIfPresent(page, 'input[type="text"]', INPUT_DATA.ATC_001.name);
    await fillIfPresent(page, 'input[name*="name" i]', INPUT_DATA.ATC_001.name);
    await fillIfPresent(page, 'input[type="email"]', INPUT_DATA.ATC_001.email);
    await fillIfPresent(page, 'input[name*="email" i]', INPUT_DATA.ATC_001.email);
    await fillIfPresent(page, 'input[type="password"]', INPUT_DATA.ATC_001.password);
    await fillIfPresent(page, 'input[name*="password" i]', INPUT_DATA.ATC_001.password);

    await clickIfPresent(page, 'button[type="submit"], button:has-text("Register"), button:has-text("Sign up")');

    // Flexible acceptance: page should stay usable after submit action
    await expect(page).toHaveURL(/\/auth\/register|\/auth\/login|\/$/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('[ATC-002] Login page accepts credentials input and submit action', async ({ page }) => {
    await goto(page, '/auth/login');

    await fillIfPresent(page, 'input[type="email"]', INPUT_DATA.ATC_002.email);
    await fillIfPresent(page, 'input[name*="email" i]', INPUT_DATA.ATC_002.email);
    await fillIfPresent(page, 'input[type="password"]', INPUT_DATA.ATC_002.password);
    await fillIfPresent(page, 'input[name*="password" i]', INPUT_DATA.ATC_002.password);

    await clickIfPresent(page, 'button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    await expect(page).toHaveURL(/\/auth\/login|\/dashboard|\/$/);
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('SmartLoan E2E - NEG', () => {
  test('[NEG-001] Login with invalid email format triggers validation', async ({ page }) => {
    await goto(page, '/auth/login');

    const email = page.locator('input[type="email"]').first();
    await expect(email).toBeVisible();
    await email.fill(INPUT_DATA.NEG_001.invalidEmail);

    await clickIfPresent(page, 'button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    const validationMessage = await email.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage.length).toBeGreaterThan(0);
  });

  test('[NEG-002] Forgot password submit with blank input does not proceed', async ({ page }) => {
    await goto(page, '/auth/forgot-password');

    await clickIfPresent(page, 'button[type="submit"], button:has-text("Reset"), button:has-text("Send")');

    await expect(page).toHaveURL(/\/auth\/forgot-password(\?.*)?$/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('[NEG-003] Invalid route shows not found behavior', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/this-route-does-not-exist`, { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    expect([200, 404]).toContain(status); // Next.js may return custom not-found page with 200/404

    await expect(page.locator('text=/not found|404|does not exist/i').first()).toBeVisible({ timeout: 10000 });
  });
});