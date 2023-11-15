import Login from "../pages/login"
import Dashboard from "../pages/dashboard"

const login = new Login()
const dashboard = new Dashboard()

describe("EP000 login page", () => {
  context('Given I login in ghost page', () => {
    beforeEach(() => {
      login.visit()
    })

    context("When I type user and password correctly", () => {
      beforeEach(() => {
        login.setInputUsername(Cypress.env('usuario'))
        login.setInputPassword(Cypress.env('password'))
        login.getSubmitButton().click()
        cy.wait(1000)
      })

      it("Then I see the title dashboard", () => {
        dashboard.getTitle().should("contain.text", "Dashboard")
        login.tomarPantallazo("F000-EP001", "1")
      })
    })

    context("When I type user and password incorrectly", () => {
      beforeEach(() => {
        login.setInputUsername(Cypress.env('usuario'))
        login.setInputPassword('incorrect')
        login.getSubmitButton().click()
        cy.wait(1000)
      })

      it("Then I see the title password incorrect", () => {
        login.getIncorrectSessionTitle().should(async (element) => {
          const text = await element.text();
          return text.includes('Your password is incorrect.') || text.includes('Too many attempts');
        });
      })
    })

    context("When I type user incorrectly", () => {
      beforeEach(() => {
        login.setInputUsername("test@test.com")
        login.setInputPassword(Cypress.env('password'))
        login.getSubmitButton().click()
        cy.wait(1000)
      })

      it("Then I see the title user not found", () => {
        login.getIncorrectSessionTitle().should("contain.text", "There is no user with that email address.")
      })
    })

    context("When I type user and password", () => {
      beforeEach(() => {
        login.getSubmitButton().click()
        cy.wait(1000)
      })

      it("Then I see the alert fill form", () => {
        login.getIncorrectSessionTitle().should("contain.text", "Please fill out the form to sign in.")
      })
    })

    context("when I click several times on the forget password button", () => {
      beforeEach(() => {
        login.setInputUsername("aaaa@bbb.com")
        login.setInputPassword("incorrect")
        for (let index = 0; index < 7; index++) {
          login.getForgotButton().click()
          cy.wait(1000)
        }
      })

      it("Then I see the alert fill form", () => {
        login.getIncorrectSessionTitle().should("contain.text", "Too many attempts try again")
      })
    })
  })

})
