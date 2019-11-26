module.exports = {
  url: "https://jobs.lever.co/traderev",
  elements: {
    headerLogo: "a[class='main-header-logo']",
    cityFilter: "div[aria-label*='Filter by City:']",
    torontoCityFilter: "a[class='category-link'][href*='location=Toronto']",
    teamFilter: "div[aria-label*='Filter by Team:']",
    engineeringTeamFilter: "li a[href*='department=Engineering'][class='group-link']",
    workTypeFilter: "div[aria-label*='Filter by Work type:']",
    jobPostingGroups: "div[class='postings-group']",
    postingCategoriesLocation: "div[class='posting-categories'] span[class*='location']",
    postingCategoriesTeam: "div[class='posting-categories'] span[class*='team']"
  }
}
