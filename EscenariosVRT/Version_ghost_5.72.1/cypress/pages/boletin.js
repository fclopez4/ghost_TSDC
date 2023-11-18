class Boletin {

    visit() {
        cy.visit("/ghost/#/settings/newsletters")
        cy.wait(1000)
    }

    clickNewLetter() {
        return cy.get('.text-green').contains('Add newsletter').click()
    }

    selectNewsLetter() {
        return cy.get('table').find('tr').first().click();
    }

    getNewsLetterButton() {
        return cy.get('table').find('tr').first();
    }

    selectSelectArchiveOption() {
        return cy.get('span').contains('Archive new').click();
    }

    selectConfirmArchive() {
        return cy.get('span:contains("Archive"):last').click();
    }

    getConfirmationArchivedMessage() {
        return cy.get('span').contains('Reactivate newsletter');
    }

    clickCreate() {
        return cy.get('.gap-3 button').contains('Create').click()
    }

    clickClose() {
        return cy.get('.gap-3 button').contains('Close').click()
    }

    getBottonSave() {
        return cy.get('.gap-3 button').contains('Save')
    }

    clickOnButtonSave() {
        return cy.get('.gap-3 button').contains('Save').click()
    }

    getModalContent(){
        return cy.get('h3').first();
    }

    getModalArchive(){
        return cy.get('h3').contains('Archive newsletter')
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }
}

module.exports = Boletin