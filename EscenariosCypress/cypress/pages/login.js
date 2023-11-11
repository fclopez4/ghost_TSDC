class Login {
    visit() {
        cy.visit("/ghost/#/signin")
        cy.wait(1000)
    }

    setInputUsername(value) {
        return cy.get('#identification').first().type(value)
    }

    setInputPassword(value) {
        return cy.get('#password').first().type(value)
    }

    getSubmitButton() {
        return cy.get("button[type=submit]").first()
    }

    getIncorrectSessionTitle(){
        return cy.get('.main-error').first()
    }

    getForgotButton(){
        return cy.get('#ember4').first()
    }

    insertLogin(){
        this.visit()
        this.setInputUsername(Cypress.env('usuario'))
        this.setInputPassword(Cypress.env('password'))
        this.getSubmitButton().click()
        cy.wait(1000)
    }
}

module.exports = Login