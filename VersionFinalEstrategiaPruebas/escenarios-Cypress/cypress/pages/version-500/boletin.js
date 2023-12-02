class Boletin {

    visit() {
        const url = Cypress.env('urlGhost500')
        Cypress.config('baseUrl', url)
        cy.visit("/ghost/#/settings/newsletters")
        cy.wait(1000)
    }

    clickNewLetter() {
        return cy.get('.gh-add-newsletter').click()
    }

    clickCreate() {
        return cy.get('.gh-btn-primary').contains('Create').click()
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }

    selectSelectOptions() {
        return cy.get('.gh-tier-card-actions-button:first-child').first().click()
    }

    getMenuArchive(){
        return cy.get('.dropdown-triangle-top-right')
    }

    clickOnArchive(){
        return cy.get('.dropdown-triangle-top-right li:eq(1)').click()
    }

    getTitleModalConfirm() {
        return cy.get(".modal-header").first()
    }

    clickOnArchiveConfirm(){
        return cy.get('.gh-btn-icon').contains('Archive').click()
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }
}

module.exports = Boletin