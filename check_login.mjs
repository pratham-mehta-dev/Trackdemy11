import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            console.log(`[BROWSER ${type.toUpperCase()}] ${text}`);
        });

        page.on('pageerror', error => {
            console.log('[BROWSER CRASH]', error.message);
        });

        console.log('Navigating to http://localhost:5174/dashboard...');
        await page.goto('http://localhost:5174/dashboard', { waitUntil: 'networkidle2' });

        // Wait a bit for async stuff to fail
        await new Promise(resolve => setTimeout(resolve, 5000));

        await browser.close();
        console.log('Puppeteer script finished.');
    } catch (err) {
        console.error("Puppeteer script error:", err);
    }
})();
