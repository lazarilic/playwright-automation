import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  async clickCheckoutLink() {
    const storeFrame = await this.getStoreFrame();
    const checkout = storeFrame.locator('div.text-sm-center > a');
    await expect(checkout).toBeVisible();
    await checkout.click();
  }

  async fillPersonalInfo(firstName: string, lastName: string) {
    const storeFrame = await this.getStoreFrame();
    const maleRadio = storeFrame.locator('input#field-id_gender-1');
    const firstNameField = storeFrame.locator('input#field-firstname');
    const lastNameField = storeFrame.locator('input#field-lastname');

    await expect(maleRadio).toBeVisible();
    await maleRadio.click();
    await firstNameField.fill(firstName);
    await lastNameField.fill(lastName);
  }

  async fillEmail(email: string) {
    const storeFrame = await this.getStoreFrame();
    const emailField = storeFrame.locator('input#field-email');
    await emailField.first().fill(email);
  }

  async acceptPrivacyAndTerms() {
    const storeFrame = await this.getStoreFrame();
    const termsCheckbox = storeFrame.locator('input[name="psgdpr"]');
    const privacyCheckbox = storeFrame.locator('input[name="customer_privacy"]');
  
    await termsCheckbox.click();
    await privacyCheckbox.scrollIntoViewIfNeeded();
    await privacyCheckbox.click();
  }

  async continueToAddress() {
    const storeFrame = await this.getStoreFrame();
    const continueButton = storeFrame.locator('button[name="continue"]');
    await continueButton.first().click();
  }

  async fillAddressInfo(address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  }) {
    const frame = await this.getStoreFrame();
  
    const addressField = frame.locator('input#field-address1');
    const cityField = frame.locator('input#field-city');
    const stateField = frame.locator('select#field-id_state');
    const postalCode = frame.locator('input#field-postcode');
  
    await expect(addressField).toBeVisible();
    await addressField.fill(address.street);
    await cityField.fill(address.city);
    await stateField.click();
    await stateField.selectOption(address.state);
    await expect(postalCode).toBeVisible();
    await postalCode.fill(address.postalCode);
  }

  async confirmAddress() {
    const storeFrame = await this.getStoreFrame();
    const confirmBtn = storeFrame.locator('button[name="confirm-addresses"]');
    await confirmBtn.click();
  }

  async confirmDelivery() {
    const storeFrame = await this.getStoreFrame();
    const deliveryBtn = storeFrame.locator('button[name="confirmDeliveryOption"]');
    await expect(deliveryBtn).toBeVisible();
    await deliveryBtn.click();
  }
  
  async confirmFinalTerms() {
    const storeFrame = await this.getStoreFrame();
    const termsCheckbox = storeFrame.locator('input#conditions_to_approve\\[terms-and-conditions\\]');
    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();
  }
}