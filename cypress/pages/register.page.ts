import {createBreak} from "typescript";


export const registerPage = {

    //Identifying the Email field on the input form
    newEmail(newEmail: string) {
        cy.get("#create_account_email").type(newEmail)
    },

    //I shouted for joy once I figured out how to do these without using .eq()
    //I am using the element where it prints the title of the input field as the guide to navigate up to the parent, and back down into the Children, using the parent's specific class values, passed through the chainable.  This makes it unique, but also uses a potentially dynamically generated class value in a repeatable and reliable fashion.
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

    //After getting the ability to find a parent and query its children directly from there, I applied the model to the rest of the identifiers, making the rest of this fairly easy.
    createPassword(newPassword: string) {
        cy.get("span.input-label").contains("Create a Password").parent().then(($el) => {
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > .ui > input').type(newPassword)
        })
    },

    //I was worried that the lack of presence of this HTML would cause an issue with the test, but it hasn't yet.
    confirmPassword(newPassword: string) {
        //cy.get("span.input-label").contains("Last Name").click()
        cy.get("div.password-confirm-input").type(newPassword)
    },

    //This seemed like a snarky way of identifying this element, since it was the only field with this attribute, but it makes it a bit flimsy if the phone value ever changed.
    newPhone(newPhone: string) {
        cy.get('input[maxlength="15"]').type(newPhone)
    },

    //At first I thought I would just click on Yes for all the tests, but that didn't seem very good.  Instead, I decided to setup a random number generator to determine for me what the test would do.  Multiple runs of this would help determine that both buttons are working.  Though for something like this, it may be that two tests are needed.  One to test the Yes is accepted and one to test the No is accepted.
    accreditedInvestor(randomAnswer: number) {
        if (randomAnswer == 0) {
            cy.get('label[data-react-toolbox="radio-button"] > input[value="false"]').siblings('div[data-react-toolbox="radio"]').click()
            }
        if (randomAnswer == 1) {
            cy.get('label[data-react-toolbox="radio-button"] > input[value="true"]').siblings('div[data-react-toolbox="radio"]').click()
        }
        else {
            //I created this break so that if somehow the value wasn't what was expected, I could come back to it and easily debug it.
            createBreak("Accredited Investor value was somehow neither 0 nor 1")
        }
    },

    //These two boxes were interesting, because I believe they are both required to create the account.  So there isn't an option to NOT select them.
    //And while I could have written out two different get() queries to find and select them, the fact they were both required, and I'm not supposed to go into Negative tests made that approach not ideal.
    termsUnderstandAgree() {
        cy.get("span.term").contains("I agree to the").parent().then(($el) => {
            //cy.log($el.attr('class').toString())
            cy.get('div.' + $el.attr('class').toString().replaceAll(" ", ".") + ' > label[data-react-toolbox="checkbox"] > div[data-react-toolbox="check"]').each( ($elm) => {
                cy.wrap($elm).click()
                //I put in this small delay because every so often I'd find that clicking on both checks quickly would sometimes tangle up the requests for what was being called (I'm guessing because of how they are classed the same on the page).
                //I put in a small delay to allow the first check to complete before initiating the second check, and subsequent javascript to recognize and recalculate if the Submit button should light up yet.
                cy.wait(500)
            })
        })
    },

    //I honestly didn't know how to do this before I came across it today.  Some interweb searches and following some instructions helped me to drill down into the iframe and play with the innards.
    notARobot() {

        const getIframe = () => {
            return cy.get('iframe[role="presentation"]').its('0.contentDocument').should('exist')
        }

        const getIframeHtml = () => {
            return getIframe().its('body').should('not.be.undefined').then(cy.wrap)
        }
        getIframeHtml().find('#recaptcha-anchor-label').should('have.text', 'I\'m not a robot').click()
        //I did this as a simple precaution.  I've seen some of these robot checks to spin for a few seconds before allowing someone in, specifically to prevent a robot from using it.
        //It may be entirely unnecessary since Cypress has a built-in wait of 7 seconds by default, and the next step is to click on a button you can't click on until this is done.
        cy.wait(3000)
    },

    //This surprised me with how easy it was to identify.  But I won't complain.  After sifting through the above challenges, it was nice to get an easy win.
    signUpButton() {
        cy.get('button.submit-button').contains('Sign Up').click()
    },

    //This object could be used to really check or retrieve any data in the modal.  Since all I need to do is check against the data I have and what its returning, this didn't take much to find and interact with.
    modalNameCheck(firstName: string) {
        return cy.get('h2.title').contains(firstName)
    }

}