import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testUser } from '../testData/users';
import { products } from '../testData/products';



test.describe('Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.navigateToStore();
    });

    test('User can add multiple products to the cart and place an order', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productPage.openProduct(products.tShirt.id);
        await productPage.addToCart();
        await cartPage.assertProductQuantity(products.tShirt.quantity);
        console.log('🛒 Added product to cart');

        await cartPage.continueShopping();
        await cartPage.navigateToStore();

        await productPage.openProduct(products.picture.id);
        await cartPage.increaseQuantity();
        await productPage.addToCart();
        await cartPage.assertProductQuantity(products.picture.quantity);
        await cartPage.assertTotalQuantity('3');
        console.log('🛒 Added product to cart');

        console.log('✅ Proceeding to checkout');
        await cartPage.proceedToCheckout();
        await checkoutPage.clickCheckoutLink();

        console.log('🧍 Filling personal information...');
        await checkoutPage.fillPersonalInfo(testUser.firstName, testUser.lastName);
        await checkoutPage.fillEmail(testUser.email);
        await checkoutPage.acceptPrivacyAndTerms();

        console.log('🏠 Filling address information...');
        await checkoutPage.continueToAddress();
        await checkoutPage.fillAddressInfo(testUser.address);
        await checkoutPage.confirmAddress();

        console.log('📦 Confirming delivery and final terms...');
        await checkoutPage.confirmDelivery();
        await checkoutPage.confirmFinalTerms();
    });
});