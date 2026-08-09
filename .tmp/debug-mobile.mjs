import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3002", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const spans = Array.from(h1.querySelectorAll('span span'));
  return {
    h1Text: h1.innerText,
    h1Rect: h1.getBoundingClientRect(),
    h1Style: getComputedStyle(h1).cssText.slice(0,0),
    fontSize: getComputedStyle(h1).fontSize,
    color: getComputedStyle(h1).color,
    spans: spans.map(s => ({
      text: s.textContent,
      transform: getComputedStyle(s).transform,
      opacity: getComputedStyle(s).opacity,
      rect: s.getBoundingClientRect(),
    })),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
