import { test, expect } from "@playwright/test";

test("failCreateAcc", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Account", href: "#" }).click();
  await page.getByRole("link", { name: "Create Account" }).click();
  await page.getByPlaceholder("First and Last Name").click();
  await page.getByPlaceholder("First and Last Name").fill("Riley Suehsschlof");
  await page.getByPlaceholder("First and Last Name").press("Tab");
  await page.getByPlaceholder("example@email.com").fill("smith@email.com");
  await page.getByPlaceholder("example@email.com").press("Tab");
  await page.getByPlaceholder("At least 6 characters").fill("smithy");
  await page.getByPlaceholder("At least 6 characters").press("Tab");
  await page.locator("#passwordAgainInput").fill("smithy");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#emailError")).toContainText(
    "User with that email already exists."
  );
});
//run tests with npx playwright test ./tests/{testName}
//have to have user with email smith@email.com and password smithy for test to pass
