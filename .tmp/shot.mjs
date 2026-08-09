import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.mouse.move(5, 5);
await page.screenshot({ path: ".tmp/01-hero.png" });

await page.locator("#configurator").scrollIntoViewIfNeeded();
await page.mouse.move(5, 5);
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/02-configurator-cafe-premium.png" });

const config = page.locator("#configurator");

// switch to clinic
await config.locator("button", { hasText: "Clinique" }).first().click();
await page.mouse.move(5, 5);
await page.waitForTimeout(500);
await page.screenshot({ path: ".tmp/03-clinic-premium.png" });

// switch to hotel
await config.locator("button", { hasText: "Hôtel" }).first().click();
await page.mouse.move(5, 5);
await page.waitForTimeout(500);
await page.screenshot({ path: ".tmp/04-hotel-premium.png" });

// switch tier to basic
await config.locator("button", { hasText: "Basic" }).first().click();
await page.mouse.move(5, 5);
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/05-hotel-basic.png" });

// switch tier to mid
await config.locator("button", { hasText: "Mid" }).first().click();
await page.mouse.move(5, 5);
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/06-hotel-mid.png" });

// toggle english language
await config.locator("button", { hasText: "Anglais" }).first().click();
await page.waitForTimeout(300);
await page.screenshot({ path: ".tmp/07-price-with-en.png" });

// TR language toggle nav
const trBtn = page.locator('header button', { hasText: 'tr' });
await trBtn.click();
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/08-tr-lang.png" });

await page.locator("#work").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/09-work.png" });

await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: ".tmp/10-contact.png" });

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
