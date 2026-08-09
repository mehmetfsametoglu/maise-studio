import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.locator("#configurator").scrollIntoViewIfNeeded();
await page.mouse.move(5, 5);
await page.waitForTimeout(500);
await page.screenshot({ path: ".tmp/11-fix-check.png" });
await browser.close();
