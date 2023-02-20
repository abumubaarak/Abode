const { async } = require("regenerator-runtime")
const { reloadApp } = require("./reload")

describe("Main", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should have text", async () => {
    await expect(element(by.id("discover-text"))).toBeVisible()
  })
})
