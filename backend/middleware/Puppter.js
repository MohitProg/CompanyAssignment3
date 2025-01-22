import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const GenratehtmlPreviewImage = async (htmlcontent, outputpath) => {
  // console.log(htmlcontent,outputpath)
  try {
    // launching puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // set html content
    await page.setContent(htmlcontent, { waitUntil: "networkidle0" });

    // Dynamically calculate the content dimensions
    const contentDimensions = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        width: Math.max(
          body.scrollWidth,
          body.offsetWidth,
          html.clientWidth,
          html.scrollWidth,
          html.offsetWidth
        ),
        height: Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ),
      };
    });

    await page.setViewport({
      height: contentDimensions.height,
      width: contentDimensions.width,
    });

    // Generate the image and save it to the specified path
    const imagePath = outputpath?.replace(".html", ".png");
    await page.screenshot({
      path: imagePath,
      clip: {
        x: 0,
        y: 0,
        width: contentDimensions.width,
        height: contentDimensions.height,
      },
    });

    // take a screent shot
    await page.screenshot({
      path: imagePath,
      fullPage: true,
    });

    await browser.close();
    return imagePath;
  } catch (error) {
    console.log(error);
  }
};
