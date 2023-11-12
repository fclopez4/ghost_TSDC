class BoletinPage {

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

    selectSelectOptions() {
        return cy.get('.gh-tier-card-actions-button:first-child').first().click()
    }

    clickSaveAndClose() {
        return cy.get('.gh-btn-icon').contains('Save and close').click()
    }

    clickCreate() {
        return cy.get('.gh-btn-primary').contains('Create').click()
    }

    lengthNewsLetter(){
        return cy.get('#sortable-objects').find('div')
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

    createRandomWord(length) {
        var consonants = 'bcdfghjklmnpqrstvwxyz',
            vowels = 'aeiou',
            rand = function (limit) {
                return Math.floor(Math.random() * limit);
            },
            i, word = '',
            length = parseInt(length, 10),
            consonants = consonants.split(''),
            vowels = vowels.split('');
        for (i = 0; i < length / 2; i++) {
            var randConsonant = consonants[rand(consonants.length)],
                randVowel = vowels[rand(vowels.length)];
            word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
            word += i * 2 < length - 1 ? randVowel : '';
        }
        return word;
    }
}

module.exports = BoletinPage