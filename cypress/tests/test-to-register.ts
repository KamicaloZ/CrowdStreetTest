import {homePage} from "../pages/home.page";
import values = require("core-js/fn/object/values");
import {registerPage} from "../pages/register.page";
import {signInPage} from "../pages/signIn.page";


describe("New Registration Test", function() {
	beforeEach( function () {
		//Put Data setup here
	})

	it("Creates a New User", function() {
		const easy_version = Math.floor(Math.random() * Math.floor(100))
		const quick_phone = Math.floor(Math.random() * Math.floor(10000000000))
		const newEmail = "BillShatner" + easy_version.toString() + "@Starship.com"
		const newFName = "Kobayashi" + easy_version.toString()
		const newLName = "Maru" + easy_version.toString()
		const newPassword = "Tiberius!" + easy_version.toString()
		const newPhone = quick_phone.toString()
		const randomAnswer = Math.floor(Math.random() * Math.floor(2))

		homePage.visitHomePage()
		homePage.createAccountButton()
		registerPage.newEmail(newEmail)
		registerPage.newFirst(newFName)
		registerPage.newLast(newFName, newLName)
		registerPage.createPassword(newPassword)
		registerPage.confirmPassword(newPassword)
		registerPage.newPhone(newPhone)
		registerPage.accreditedInvestor(randomAnswer)
		registerPage.termsUnderstandAgree()
		registerPage.notARobot()
		registerPage.signUpButton()
		registerPage.modalNameCheck(newFName).should('contain', newFName).should('contain', 'Congrats')
})
