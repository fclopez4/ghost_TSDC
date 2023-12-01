class User {

    visit() {
        cy.visit("/ghost/#/members")
        cy.wait(1000)
    }

    clickNewMember() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').contains('New').click()
    }

    clickSelectUser() {
        return cy.get('tr:eq(1)').click();
    }

    clickSelectUserByRow(id) {
        return cy.get('tr:eq(' +id +')').click();
    }

    clickSaveMember() {
        return cy.get('button').contains('Save').click()
    }

    getRespose() {
        return cy.get('.response');
    }

    fillTagById(idTag,value) {
        return cy.get(idTag).type(value);
    }

    clearTagById(idTag) {
        return cy.get(idTag).clear();
    }
}

module.exports = User