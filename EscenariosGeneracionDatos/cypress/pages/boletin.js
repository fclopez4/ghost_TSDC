class Boletin {

    visit() {
        cy.visit("/ghost/#/settings/newsletters")
        cy.wait(1000)
    }

    clickNewLetter() {
        return cy.get('.gh-add-newsletter').click()
    }

    selectNewsLetter() {
        return cy.get('.sortable-objects')
            .find('div.draggable-object')
            .first()
            .click();
    }

    clickSaveAndClose() {
        return cy.get('.gh-btn-icon').contains('Save and close').click()
    }

    expandEmailSection() {
        return cy.get('button[data-test-nav-toggle="general.email"]').click();
    }

    clickCreate() {
        return cy.get('.gh-btn-primary').contains('Create').click()
    }

    clearTagById(idTag) {
        return cy.get(idTag).clear();
    }

    getRespose() {
        return cy.get('.response');
    }

    getSpan() {
        return cy.get("span");
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }
}

module.exports = Boletin