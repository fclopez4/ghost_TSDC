class Login {
    visit() {
        const url = Cypress.env('urlGhost568')
        Cypress.config('baseUrl', url)
        cy.visit("/ghost/#/signin")
        cy.wait(1000)
    }

    setInputUsername(value) {
        return cy.get('[name=identification]').first().type(value)
    }

    setInputPassword(value) {
        return cy.get('[name=password]').first().type(value)
    }

    getSubmitButton() {
        return cy.get("button[type=submit]").first()
    }

    getIncorrectSessionTitle() {
        return cy.get('.main-error').first()
    }

    getForgotButton() {
        return cy.get('#ember4').first()
    }

    insertLogin() {
        this.visit()
        this.setInputUsername(Cypress.env('usuario'))
        this.setInputPassword(Cypress.env('password'))
        this.getSubmitButton().click()
        cy.wait(1000)
    }

    /**
    * 
    * @param {*} escenario nombre de la carpeta debe ser con nomenclatura F000-EP000 
    * @param {*} nombre numero de paso
    */
    tomarPantallazo(escenario, nombre) {
        cy.screenshot(`${escenario}-${nombre}`, { overwrite: true, capture: 'fullPage' })
    }
}

module.exports = Login