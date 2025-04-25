import { Page, Frame } from '@playwright/test';
export class BasePage {
    protected page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async getStoreFrame(): Promise<Frame> {
      const frame = await this.page.frame({ name: 'framelive' });
      if (!frame) throw new Error('Frame "framelive" not found');
      await frame.waitForSelector('body', { timeout: 10000 });
      return frame;
    }
  }