import { test, expect } from '@playwright/test';

/**
 * Wait for React to hydrate the form.
 * After hydration, the form gets data-ready="true" (set in useEffect).
 */
async function waitForFormReady(page: import('@playwright/test').Page, sectionSelector = '#request') {
  await page.locator(`${sectionSelector} form[data-ready="true"]`).waitFor({
    state: 'visible',
    timeout: 15000,
  });
}

/**
 * Fill required form fields: Имя and Телефон.
 */
async function fillRequiredFields(page: import('@playwright/test').Page) {
  await page.locator('#rf-name').fill('Тестовый Клиент');
  await page.locator('#rf-phone').fill('+7 999 123-45-67');
}

test.describe('Форма заявки — главная страница', () => {
  test('Форма на главной отправляется успешно', async ({ page }) => {
    await page.goto('/');

    await page.locator('#request').scrollIntoViewIfNeeded();
    await waitForFormReady(page, '#request');

    await fillRequiredFields(page);

    // Optionally fill email
    await page.locator('#rf-email').fill('qa@example.com');

    await page.locator('#rf-submit').scrollIntoViewIfNeeded();
    await page.locator('#rf-submit').click();

    await expect(page.locator('#rf-submit')).toContainText('Отправляем', { timeout: 3000 }).catch(() => {
      // If we missed the loading state (very fast API), that's fine
    });

    await expect(page.getByRole('status')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('status')).toContainText('принят', { ignoreCase: true });
  });

  test('Форма — honeypot молча принимает', async ({ page }) => {
    await page.goto('/');
    const response = await page.evaluate(async () => {
      const fd = new FormData();
      fd.append('name', 'SpamBot');
      fd.append('phone', '+7 000 000-00-00');
      fd.append('website', 'http://spam.example.com');
      const res = await fetch('/api/request', { method: 'POST', body: fd });
      return res.json();
    });
    expect(response.success).toBe(true);
  });
});

test.describe('Форма заявки — страница контактов', () => {
  test('Форма на /contacts/ отправляется успешно', async ({ page }) => {
    await page.goto('/contacts/');

    await page.locator('#request').scrollIntoViewIfNeeded();
    await waitForFormReady(page, '#request');

    await fillRequiredFields(page);

    await page.locator('#rf-submit').scrollIntoViewIfNeeded();
    await page.locator('#rf-submit').click();

    await expect(page.getByRole('status')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('status')).toContainText('принят', { ignoreCase: true });
  });
});

test.describe('API форма — прямые тесты', () => {
  test('API /api/request — 200 при корректных данных', async ({ page }) => {
    await page.goto('/');
    const response = await page.evaluate(async () => {
      const fd = new FormData();
      fd.append('name', 'Тест Клиент');
      fd.append('phone', '+7 999 000-00-00');
      const res = await fetch('/api/request', { method: 'POST', body: fd });
      return { status: res.status, body: await res.json() };
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('API /api/request — 400 при пустых полях', async ({ page }) => {
    await page.goto('/');
    const response = await page.evaluate(async () => {
      const fd = new FormData();
      const res = await fetch('/api/request', { method: 'POST', body: fd });
      return { status: res.status, body: await res.json() };
    });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('API /api/request — honeypot молча принимает', async ({ page }) => {
    await page.goto('/');
    const response = await page.evaluate(async () => {
      const fd = new FormData();
      fd.append('name', 'Bot');
      fd.append('phone', '+7 000 000-00-00');
      fd.append('website', 'http://spam.example.com');
      const res = await fetch('/api/request', { method: 'POST', body: fd });
      return { status: res.status, body: await res.json() };
    });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
