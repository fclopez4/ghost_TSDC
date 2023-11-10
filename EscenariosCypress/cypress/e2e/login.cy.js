import Login from "../pages/login"
import Dashboard from "../pages/dashboard"

const login = new Login()
const dashboard = new Dashboard()

describe("scenery #1 login page", () => {
  beforeEach(() => {
    login.visit()
  })

  it("should login user success with valid credentials", () => {
    login.setInputUsername(Cypress.env('usuario'))
    login.setInputPassword(Cypress.env('password'))
    login.getSubmitButton().click()
    cy.wait(1000)
    dashboard.getTitle().should("contain.text", "Dashboard")
  })

  it("should have incorrect session title password incorrect",() => {
    login.setInputUsername(Cypress.env('usuario'))
    login.setInputPassword('incorrect')
    login.getSubmitButton().click()
    cy.wait(1000)
    login.getIncorrectSessionTitle().should(async (element) => {
      const text = await element.text();
      return text.includes('Your password is incorrect.') || text.includes('Too many attempts');
    });
  })

  it("should have message error when fill input user with invalid email adress",() => {
    login.setInputUsername("aaaa@bbb.com")
    login.setInputPassword("incorrect")
    login.getSubmitButton().click()
    cy.wait(1000)
    login.getIncorrectSessionTitle().should("contain.text", "There is no user with that email address.")
  })

  it("should have message error when not fill any input",() => {
    login.getSubmitButton().click()
    cy.wait(1000)
    login.getIncorrectSessionTitle().should("contain.text", "Please fill out the form to sign in.")
  })  


  it("should have error with username not found when click in forgot password",() => {
    login.setInputUsername("aaaa@bbb.com")
    login.setInputPassword("incorrect")
    for (let index = 0; index < 7; index++) {
      login.getForgotButton().click()
      cy.wait(1000)
    }
    login.getIncorrectSessionTitle().should("contain.text", "Too many attempts try again")
  })
})
