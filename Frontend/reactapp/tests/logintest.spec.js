import { test, expect } from "@playwright/test";

test("logintest", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Account", href: "#" }).click();
  await page.getByPlaceholder("Email Address").click();
  await page.getByPlaceholder("Email Address").fill("smith@email.com");
  await page.getByPlaceholder("Email Address").press("Tab");
  await page.getByPlaceholder("Password").fill("smiths");
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator("a#accountNavBtn").click();
  await page.locator('label:has-text("Name:")').waitFor();
  await expect(page.getByLabel("Name:")).toHaveValue("smith");
});
//currently broken
