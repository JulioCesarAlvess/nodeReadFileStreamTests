import { Browser, launch, PaperFormat } from 'puppeteer';
import { htmlName } from '../config/utils';

class BrowserService {
  private browser: Browser;
  public static instance: BrowserService | null = null;

  public static async getInstance(): Promise<Browser> {
    this.instance = new BrowserService();
    await this.instance.initialize();

    return this.instance.browser;
  }

  public async initialize(): Promise<void> {
    this.browser = await launch({
      args: [
        '--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    });
  }
}

export async function createPdf() {
  const browser = await BrowserService.getInstance();
  const page = await browser.newPage();
  await page.setViewport({
    width: 794,
    height: 1122,
    deviceScaleFactor: 2,
  });

  const url = `file://${process.cwd()}/${htmlName}`;
  await page.goto(url);

  const format: PaperFormat = 'A4';
  const options = {
    format,
    margin: {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
    },
  };

  const pdfStream = await page.createPDFStream(options);

  return {
    pdfStream,
    page,
  };
}
