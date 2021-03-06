import {homePage} from "../pages/home.page";
import {registerPage} from "../pages/register.page";


describe("New Registration Test", function() {
	beforeEach(function () {
		//Put Data setup here
	})

	it("Creates a New User", function () {
		//Setting up parameterized data for the test itself here
		const easy_version = Math.floor(Math.random() * Math.floor(100))
		const quick_phone = Math.floor(Math.random() * Math.floor(10000000000))
		const newEmail = "BillShatner" + easy_version.toString() + "@Starship.com"
		const newFName = "Kobayashi" + easy_version.toString()
		const newLName = "Maru" + easy_version.toString()
		const newPassword = "Tiberius!" + easy_version.toString()
		const newPhone = quick_phone.toString()
		const randomAnswer = Math.floor(Math.random() * Math.floor(2))

		//The steps for the test, hopefully logically named to make it easy for the reader to see what it is trying to do
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
		//The assertion takes place in the test so that the page object itself can be used for other tests without them having to pass/fail
		registerPage.modalNameCheck(newFName).should('contain', newFName).should('contain', 'Congrats')
	})
})
