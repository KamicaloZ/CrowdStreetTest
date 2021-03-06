

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