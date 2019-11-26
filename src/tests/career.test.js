const assert = require("assert")
const util = require("../util")
const waitDuration = 100

module.exports = {
  "verify Canada TradeRev career page is displayed properly": async function(browser) {
    const homePage = browser.page.homepage()
    const careerPage = browser.page.careers()
    const jobsPage = browser.page.jobs()

    homePage.navigate().navToCareersPage()
    await util.changeTabFocus(browser, 1)

    careerPage.expect.url().to.contain(careerPage.url)
    careerPage.expect.element("@siteTitle").to.be.visible.before(waitDuration)
    careerPage.expect.element("@videoContent").to.be.visible.before(waitDuration)
    careerPage.expect.element("@canadianJobsButton").to.be.visible.before(waitDuration)
    careerPage.expect.element("@usaJobsButton").to.be.visible.before(waitDuration)
    careerPage.assert.containsText("@canadianJobsButton", "Canadian Opportunities")
    careerPage.assert.containsText("@usaJobsButton", "U.S. Opportunities")

    careerPage.click("@canadianJobsButton")
    await util.changeTabFocus(browser, 2)

    jobsPage.expect.url().to.contain(jobsPage.url)
    jobsPage.expect.element("@headerLogo").to.be.visible.before(waitDuration)
    jobsPage.expect.element("@cityFilter").to.be.visible.before(waitDuration)
    jobsPage.expect.element("@teamFilter").to.be.visible.before(waitDuration)
    jobsPage.expect.element("@workTypeFilter").to.be.visible.before(waitDuration)
    jobsPage.expect.element("@jobPostingGroups").to.be.visible.before(waitDuration)

    browser.end()
  },

  "verify job filter (city) is working properly": async function(browser) {
    const jobsPage = browser.page.jobs()

    jobsPage.navigate()

    jobsPage.waitForElementVisible("@cityFilter").click("@cityFilter")
    jobsPage.waitForElementVisible("@torontoCityFilter").click("@torontoCityFilter")
    jobsPage.pause(1000)

    jobsPage.expect.url().to.contain("location=Toronto")

    function testLocationSearchResult(items) {
      items.value.forEach(function(el) {
        browser.elementIdText(el.ELEMENT, function(text) {
          assert.equal(text.value, "TORONTO, ONTARIO, CANADA")
        })
      })
    }
    browser.elements(util.cssSelector, jobsPage.elements.postingCategoriesLocation, testLocationSearchResult)

    browser.end()
  },

  "verify job filter (city) and (team) is working properly": async function(browser) {
    const jobsPage = browser.page.jobs()

    jobsPage.navigate()

    jobsPage.waitForElementVisible("@cityFilter").click("@cityFilter")
    jobsPage.waitForElementVisible("@torontoCityFilter").click("@torontoCityFilter")
    jobsPage.waitForElementVisible("@teamFilter").click("@teamFilter")
    jobsPage.waitForElementVisible("@engineeringTeamFilter").click("@engineeringTeamFilter")
    jobsPage.pause(1000)

    jobsPage.expect.url().to.contain("location=Toronto")
    jobsPage.expect.url().to.contain("department=Engineering")

    function testLocationSearchResult(items) {
      items.value.forEach(function(el) {
        browser.elementIdText(el.ELEMENT, function(text) {
          assert.equal(text.value, "TORONTO, ONTARIO, CANADA")
        })
      })
    }

    function testTeamSearchResult(items) {
      console.log("Total available positions listed: ", items.value.length)
      items.value.forEach(function(el) {
        browser.elementIdText(el.ELEMENT, function(text) {
          assert.ok(text.value.includes("ENGINEERING"))
        })
      })
    }
    browser.elements(util.cssSelector, jobsPage.elements.postingCategoriesLocation, testLocationSearchResult)
    browser.elements(util.cssSelector, jobsPage.elements.postingCategoriesTeam, testTeamSearchResult)

    browser.end()
  }
}
