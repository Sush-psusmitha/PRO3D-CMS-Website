const { chromium } = require('playwright');
const OUT = 'C:\Users\SUSHMI~1\AppData\Local\Temp\claude\d--office-work-PROD-3D-pro-3d-new-v1\696c5420-c18f-4507-bdf3-f2b8401986b1\scratchpad\';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 900 } });
  await page.goto('http://localhost:8099/index.html');
  await page.locator('.about-headline').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: OUT + 'about-mobile-top.png' });
  await page.locator('.about-clients-row').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: OUT + 'about-mobile-bottom.png' });
  await browser.close();
})();
