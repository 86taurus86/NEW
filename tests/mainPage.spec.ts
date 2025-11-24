import { test, expect } from '@playwright/test';

test.describe('Тесты основной таблицы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации в заголовке', async ({ page }) => {
    test.step('Проверка отображения элемента Playwright logo', async () => {
      await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    });

    test.step('Проверка отображения элемента ', async () => {
      await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
    });

    await expect(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
  });

  test('Проверка наименований элементов навигации в заголовке', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });

  test('Проверка атрибута href элементов навигации в заголовке', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );

    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      '/docs/api/class-playwright',
    );
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );

    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
    await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
      'href',
      'https://aka.ms/playwright/discord',
    );
  });

  test('Проверка переключения светлой/темной страницы', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
    await expect(
      page.getByRole('button', { name: 'Switch between dark and light' }),
    ).toHaveAttribute('title', 'system mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
    await expect(
      page.getByRole('button', { name: 'Switch between dark and light' }),
    ).toHaveAttribute('title', 'light mode');

    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'dark');
    await expect(
      page.getByRole('button', { name: 'Switch between dark and light' }),
    ).toHaveAttribute('title', 'dark mode');
  });

  test('Проверка отображения заголовка и текста в нем', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });

  ['system', 'light', 'dark'].forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
