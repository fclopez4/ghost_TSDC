class User {

    visit() {
        cy.visit("/ghost/#/members")
        cy.wait(1000)
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    clickNewMember() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').contains('New').click()
    }

    clickSelectUser() {
        return cy.get('tr:eq(1)').click();
    }

    clickSettingButton() {
        return cy.get('.gh-btn-action-icon').click();
    }

    clickDeleteButton() {
        return cy.get('.gh-member-actions-menu li:eq(1)').click()
    }

    clickSaveMember() {
        return cy.get('button').contains('Save').click()
    }

    getEditTitlePage() {
        return cy.get('.view-actions').first()
    }

    getMemberName(){
        return cy.get("#member-name")
    }

    getDeleteMenu(){
        return cy.get('.gh-member-actions-menu')
    }

    getConfirmationPopUp(){
        return cy.get('.modal-content')
    }

    clickConfirmationPopUp(){
        return cy.get('.gh-btn-red').contains('Delete member').click()
    }

    getButtonSave() {
        return cy.get('.gh-btn-icon')
    }

    geMemberEmail(){
        return cy.get("#member-email")
    }

    getMemberLabel(){
        return cy.get(".ember-power-select-trigger-multiple-input")
    }

    getMemberNote(){
        return cy.get("#member-note")
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }
}

module.exports = User