const pageCommands = {
  navToCareersPage: function() {
    this.waitForElementVisible("@careersPageButton")
    this.assert.containsText("@careersPageButton", "Careers")
    return this.click("@careersPageButton")
  }
}

module.exports = {
  url: "https://www.traderev.com/en-ca/",
  commands: [pageCommands],
  elements: {
    careersPageButton: "a[href*='work']"
  }
}
