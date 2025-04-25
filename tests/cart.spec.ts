import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.prestashop.com/');
        await page.frameLocator('iframe[name="framelive"]').locator('#loadingMessage').waitFor({ state: 'detached' });
    });

    test('User can add multiple products to the cart and place an order', async ({ page }) => {
        
        const storeFrame = page.frameLocator('iframe[name="framelive"]');

        const secondProduct = storeFrame.locator('article[data-id-product="2"]');

        //open product details
        await secondProduct.first().click();

        const addToCartButton = storeFrame.locator('button[data-button-action="add-to-cart"]');
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        //assert product quantity
        const productQuantity = storeFrame.locator('span.product-quantity');
        await expect(productQuantity).toBeVisible();
        await expect(productQuantity).toHaveText('Quantity: 1');

        const continueShoppingButton = storeFrame.locator('div.cart-content-btn > button');
        await continueShoppingButton.click();

        await page.goto('https://demo.prestashop.com/');
        await page.frameLocator('iframe[name="framelive"]').locator('#loadingMessage').waitFor({ state: 'detached' });

        const thirdProduct = storeFrame.locator('article[data-id-product="3"]');
        await thirdProduct.first().click();
        await expect(addToCartButton).toBeVisible();

        //increase quantity
        const upButton = storeFrame.locator('button.bootstrap-touchspin-up');
        await upButton.click();
        await addToCartButton.click();

        await expect(productQuantity).toBeVisible();
        await expect(productQuantity).toHaveText('Quantity: 2');

        const totalCartQuantity = storeFrame.locator('p.cart-products-count');
        await expect(totalCartQuantity).toHaveText('There are 3 items in your cart.');

        //proceed to checkout
        const proceedToCheckout = storeFrame.locator('a.btn.btn-primary>i');
        await expect(proceedToCheckout.first()).toBeVisible();
        proceedToCheckout.first().click();

        const checkout = storeFrame.locator('div.text-sm-center > a');
        await expect(checkout).toBeVisible();
        await checkout.click();

        //set personal information
        const maleRadioButton = storeFrame.locator('input#field-id_gender-1');
        await expect(maleRadioButton).toBeVisible();
        await maleRadioButton.click();

        const firstName = storeFrame.locator('input#field-firstname');
        await firstName.fill('Lazar');

        const lasttName = storeFrame.locator('input#field-lastname');
        await lasttName.fill('Ilic');

        const email = storeFrame.locator('input#field-email');
        await email.first().fill('lazarilic9@gmail.com');

        const termsCheckbox = storeFrame.locator('input[name="psgdpr"]');
        await termsCheckbox.click();

        const privacyCheckbox = storeFrame.locator('input[name="customer_privacy"]');
        await privacyCheckbox.scrollIntoViewIfNeeded();
        await privacyCheckbox.click();

        const continueButton = storeFrame.locator('button[name="continue"]');
        await continueButton.first().click();

        //set address
        const addressField = storeFrame.locator('input#field-address1');
        await expect(addressField).toBeVisible();
        await addressField.fill('test address');

        const cityField = storeFrame.locator('input#field-city');
        await cityField.fill('Belgrade');

        const state = storeFrame.locator('select#field-id_state');
        await state.click();
        await state.selectOption('Alabama')

        const postalCode = storeFrame.locator('input#field-postcode');
        await expect(postalCode).toBeVisible();
        await postalCode.fill('11000');

        const confirmAddressButton = storeFrame.locator('button[name="confirm-addresses"]');
        await confirmAddressButton.click();

        //confirm delivery
        const confirmDeliveryButton = storeFrame.locator('button[name="confirmDeliveryOption"]');
        await expect(confirmDeliveryButton).toBeVisible();
        await confirmDeliveryButton.click();

        const termsCheckbox2 = storeFrame.locator('input#conditions_to_approve\\[terms-and-conditions\\]');
        await expect(termsCheckbox2).toBeVisible();
        await termsCheckbox2.check();

    });
});