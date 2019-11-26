async function changeTabFocus(browser, tabIndex = 1) {
  const result = await browser.windowHandles()
  const handle = result.value[tabIndex]
  browser.switchWindow(handle)
}

module.exports.cssSelector = "css selector"
module.exports.changeTabFocus = changeTabFocus
