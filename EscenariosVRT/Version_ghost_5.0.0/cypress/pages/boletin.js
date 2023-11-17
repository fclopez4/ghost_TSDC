class Boletin {

    visit() {
        cy.visit("/ghost/#/settings/newsletters")
        cy.wait(1000)
    }

    clickNewLetter() {
        return cy.get('.gh-add-newsletter').click()
    }

    selectNewsLetter() {
        return cy.get('.sortable-objects').find('div.draggable-object').first().click();
    }

    openEditName() {
        return cy.get('.modal-fullsettings-tab').contains('Name and desc').click()
    }

    selectSelectOptions() {
        return cy.get('.gh-tier-card-actions-button:first-child').first().click()
    }

    clickSaveAndClose() {
        return cy.get('.gh-btn-icon').contains('Save and close').click()
    }

    clickCreate() {
        return cy.get('.gh-btn-primary').contains('Create').click()
    }

    getModalContent(){
        return cy.get('.modal-content')
    }

    getMenuArchive(){
        return cy.get('.dropdown-triangle-top-right')
    }

    clickOnArchive(){
        return cy.get('.dropdown-triangle-top-right li:eq(1)').click()
    }

    clickOnArchiveConfirm(){
        return cy.get('.gh-btn-icon').contains('Archive').click()
    }

    getTitleEdit() {
        return cy.get(".modal-fullsettings-heading-labs").first()
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    getTitleModalConfirm() {
        return cy.get(".modal-header").first()
    }

    getTextBody() {
        return cy.get("h5").first()
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }
}

module.exports = Boletin