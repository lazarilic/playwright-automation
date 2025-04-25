import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {

    async assertProductQuantity(expected: string) {
      const storeFrame = await this.getStoreFrame();
      const quantity = storeFrame.locator('span.product-quantity');
      await expect(quantity).toBeVisible();
      await expect(quantity).toBeEnabled();
      await expect(quantity).toHaveText('Quantity: ' + expected);
    }
  
    async assertCartItemCount(expected: string) {
      const storeFrame = await this.getStoreFrame();
      const count = storeFrame.locator('p.cart-products-count');
      await expect(count).toHaveText(expected);
    }

    async continueShopping() {
      const storeFrame = await this.getStoreFrame();
      const button = storeFrame.locator('div.cart-content-btn > button');
      await button.click();
    }

    async increaseQuantity() {
      const storeFrame = await this.getStoreFrame();
      const upButton = storeFrame.locator('button.bootstrap-touchspin-up');
      await expect(upButton).toBeEnabled();
      await upButton.click();
    }

    async assertTotalQuantity(expected: string) {
      const storeFrame = await this.getStoreFrame();
      const total = storeFrame.locator('p.cart-products-count');
      await expect(total).toHaveText(`There are ${expected} items in your cart.`);
    }

    async proceedToCheckout() {
      const storeFrame = await this.getStoreFrame();
      const button = storeFrame.locator('a.btn.btn-primary > i');
      const wrapper = button.first();
      await expect(wrapper).toBeVisible();
      await wrapper.click();
    }

    async navigateToStore() {
      await this.page.goto('https://demo.prestashop.com/');
      await this.page.frameLocator('iframe[name="framelive"]').locator('#loadingMessage').waitFor({ state: 'detached' });
    }
  }