const puppet = require('puppeteer');
const fs = require('fs');

const getScreenshot = async (url, projectId) => {
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto(url);
  await page.screenshot({ path: `${projectId}.png` });
  await browser.close();
  // move new image file to sreenshots folder
  await fs.rename(`./${projectId}.png`, `./dist/images/${projectId}.png`, (err) => {
    if (err) console.log('ERROR:', err);
  });
};

module.exports = { getScreenshot };
