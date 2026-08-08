import { chromium } from "playwright";
const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
await page.goto(BASE + "/colour-visualizer", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

async function pick(name) {
  await page.locator('button[aria-label="Choose a shade"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('input[placeholder*="hex"]').fill(name);
  await page.waitForTimeout(300);
  await page.locator("text=" + name).first().click();
  await page.waitForTimeout(500);
}

for (const name of ["Sapphire Blue", "Ivory Silk", "Storm Grey", "Warm Sand"]) {
  await pick(name);
  await page.screenshot({ path: `qa_lroom_${name.replace(/\s/g, "")}.png` });
}
console.log("done");
await browser.close();
