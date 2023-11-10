class Login {
    visit() {
        cy.visit("http://localhost:3001/ghost/#/signin")
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

    
}

module.exports = Login