

export const homePage = {

    visitHomePage() {
        cy.visit("https://test.crowdstreet.com")
    },

    createAccountButton() {
        cy.get('div.header-menus > div[class*="css-"] > a.join-button').then(($el) => {
            cy.wrap($el).click()
        })
    },

    signIn() {
        cy.get('div.header-menus > div[class*="css-"] > a.log-in-button').then(($el) => {
            cy.wrap($el).click()
        })
    }
}