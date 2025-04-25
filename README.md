# Playwright Automation

End-to-end (E2E) testing framework built with [Playwright](https://playwright.dev/) using the Page Object Model (POM) design pattern.

---

## 📦 Project Structure

- `/pages` — Page Object classes (CartPage, ProductPage, CheckoutPage)
- `/tests` — Test files written using Playwright test runner
- `/testData` — Externalized test data (users, products, addresses)

---

## 🚀 Setup Instructions

### 1. Install Node.js

Make sure you have Node.js installed:

```bash
node -v
```
If not, install Node.js using Homebrew:
```
brew install node
```
### 2. Install Playwright
```
npm init -y
npm install -D @playwright/test
npx playwright install
```
### 3. Running Tests
```
Run all tests:
npx playwright test

Run tests on deskop:
npx playwright test cart.spec.ts --project "Desktop Chrome"

Run tests on mobile:
npx playwright test cart.spec.ts --project "Mobile Safari"

```



### ✨ Quick Start

```
# Clone the repo
git clone git@github.com:lazarilic/playwright-automation.git

# Move into the project directory
cd playwright-automation

# Install dependencies
npm install

# Run tests
npx playwright test
```
