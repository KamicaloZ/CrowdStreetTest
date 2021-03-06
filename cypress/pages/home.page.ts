

export const homePage = {

    //Basic visit request for Cypress to get to the home page
    visitHomePage() {
        cy.visit("https://test.crowdstreet.com")
    },

    //Identifying the visible and commonly placed Create Account button in the top-right of the page
    createAccountButton() {
        cy.get('div.header-menus > div[class*="css-"] > a.join-button').then(($el) => {
            cy.wrap($el).click()
        })
    },

    //Identifying the visible and commonly placed Sign In button in the top-right of the page
    signIn() {
        cy.get('div.header-menus > div[class*="css-"] > a.log-in-button').then(($el) => {
            cy.wrap($el).click()
        })
    }
}