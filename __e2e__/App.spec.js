const { async } = require("regenerator-runtime")
const { reloadApp } = require("./reload")

describe("Main", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should show discover text", async () => {
    await expect(element(by.id("discover-text"))).toBeVisible()
  })

  it("should search for listings", async () => {
    await element(by.id("search")).tap()
    await element(by.id("search-imput")).typeText("Berlin")
    await element(by.text("Berlin, Germany")).tap()
    await expect(element(by.id("search-box"))).toBeVisible()
    await expect(element(by.text("Berlin, Germany"))).toBeVisible()
  })

  it("should render listing details screen", async () => {
    await element(by.id("listing-card")).atIndex(0).tap()
    await element(by.id('swipe')).atIndex(0).swipe('left');
    await element(by.id('swipe')).atIndex(1).swipe('left');
    await expect(element(by.id("listing-title"))).toBeVisible()
    await expect(element(by.id("listing-amount"))).toBeVisible()

  })
})
