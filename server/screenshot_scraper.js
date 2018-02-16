const puppet = require('puppeteer');
const fse = require('fs-extra');

const getScreenshot = async (url, fileName, dest) => {
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto(url);
  await page.screenshot({ path: `${fileName}.png` });
  await browser.close();
  // move new image file to sreenshots folder
  try {
    await fse.rename(`./${fileName}.png`, `${dest}${fileName}.png`);
  } catch (err) {
    console.log('ERROR:', err);
  }
  return 'screenshot complete';
};

module.exports = { getScreenshot };
