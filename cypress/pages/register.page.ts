import {createBreak} from "typescript";


export const registerPage = {

    newEmail(newEmail: string) {
        cy.get("#create_account_email").type(newEmail)
    },

    //I shouted for joy once I figured out how to do these without using .eq()
    //I am using the element where it prints the title of the input field as the guide to navigate up to the parent, and back down into the Children.
    //And since First Name has an extra class in it, finding it first was easy.
    newFirst(firstName: string) {
        cy.get("span.input-label").contains("First Name").parent().should("be.visible")

        cy.get("span.input-label").contains("First Name").parent().then(($el) => {
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > .ui > input').type(firstName)
        })
    },

    //Then after I had something filled out in the first name, it was easy to identify the Last Name field by requiring it to be blank.
    newLast(firstName: string, lastName: string) {
        cy.get("span.input-label").contains("Last Name").parent().then(($el) => {
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > .ui > input[value=""]').type(lastName)
        })
    },

    createPassword(newPassword: string) {
        cy.get("span.input-label").contains("Create a Password").parent().then(($el) => {
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > .ui > input').type(newPassword)
        })
    },

    confirmPassword(newPassword: string) {
        //cy.get("span.input-label").contains("Last Name").click()
        cy.get("div.password-confirm-input").type(newPassword)
    },

    newPhone(newPhone: string) {
        cy.get('input[maxlength="15"]').type(newPhone)
    },

    accreditedInvestor(randomAnswer: number) {
        if (randomAnswer == 0) {
            cy.get('label[data-react-toolbox="radio-button"] > input[value="false"]').siblings('div[data-react-toolbox="radio"]').click()
            }
        if (randomAnswer == 1) {
            cy.get('label[data-react-toolbox="radio-button"] > input[value="true"]').siblings('div[data-react-toolbox="radio"]').click()
        }
        else {
            createBreak("Accredited Investor value was somehow neither 0 nor 1")
        }
    },

    termsUnderstandAgree() {
        cy.get("span.term").contains("I agree to the").parent().then(($el) => {
            //cy.log($el.attr('class').toString())
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > label[data-react-toolbox="checkbox"] > div[data-react-toolbox="check"]').each( ($elm) => {
                cy.wrap($elm).click()
                cy.wait(500)
            })
        })
    },

    notARobot() {

        const getIframe = () => {
            return cy.get('iframe[role="presentation"]').its('0.contentDocument').should('exist')
        }

        const getIframeHtml = () => {
            return getIframe().its('body').should('not.be.undefined').then(cy.wrap)
        }
        getIframeHtml().find('#recaptcha-anchor-label').should('have.text', 'I\'m not a robot').click()
        cy.wait(3000)
    },

    signUpButton() {
        cy.get('button.submit-button').contains('Sign Up').click()
    },

    modalNameCheck(firstName: string) {
        return cy.get('h2.title').contains(firstName)
    }

}