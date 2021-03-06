
//I started making a Sign In page and subsequent confirm login can occur test, but thought it was more than the requested "registration" task, and didn't want to put more time into it than the task being requested for.
//I'm  keeping it in since I found it worth noting that only the registration process (from what I've seen) has the difficult-to-identify portions.
export const signInPage = {

    inputUsername(newUsername: string) {
        cy.get('input[name="password"]').type(newUsername)
    },

    inputPassword(newPassword: string) {
        cy.get('input[name="password"]').type(newPassword)
    },

    signInButton() {
        cy.get('#btn_login').click()
    }
}