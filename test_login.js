import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  // click login
  await page.click('text/Sign In');
  await page.waitForSelector('input[type="email"]');
  
  await page.type('input[type="email"]', 'teststudent4@example.com');
  await page.type('input[type="password"]', 'password');
  
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000); // wait a bit to see if error happens after loaded
  
  await browser.close();
})();
