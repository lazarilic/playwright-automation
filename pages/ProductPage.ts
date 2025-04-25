import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
    async openProduct(productId: string) {
      const storeFrame = await this.getStoreFrame();
      const product = storeFrame.locator(`article[data-id-product="${productId}"]`);
      await product.first().click();
    }
  
    async addToCart() {
      const storeFrame = await this.getStoreFrame();
      const addButton = storeFrame.locator('button[data-button-action="add-to-cart"]');
      await expect(addButton).toBeVisible();
      await expect(addButton).toBeEnabled();
      await addButton.click();
    }
  
    async continueShopping() {
      const storeFrame = await this.getStoreFrame();
      const button = storeFrame.locator('div.cart-content-btn > button');
      await button.click();
    }
  
    async increaseQuantity() {
      const storeFrame = await this.getStoreFrame();
      const upButton = storeFrame.locator('button.bootstrap-touchspin-up');
      await upButton.click();
    }
  }