import Login from "../pages/login"
 
 const login = new Login()
  
 describe("scenery #1 login page", () => {
   it("should visit home page", () => {
     login.visit()
   })
  
   it("should search for a product", () => {
     login.setInputUsername(Cypress.env('usuario'))
     login.setInputPassword(Cypress.env('password'))
     login.getSubmitButton().click()
   })
 })