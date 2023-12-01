class Tags {
    constructor() {
        this.url = "/ghost/#/tags"
    }

    visit() {
        const url = Cypress.env('urlGhost500')
        Cypress.config('baseUrl', url)
        cy.visit(this.url)
        cy.wait(1000)
    }

    clickButtonNewTag() {
        return cy.get('section.view-actions>a.ember-view.gh-btn.gh-btn-primary')
            .first().click()
    }

    getButtonNewTag() {
        return cy.get('section.view-actions>a.ember-view.gh-btn.gh-btn-primary').first()
    }

    clickButtonSaveTag() {
        return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
            .first().click()
    }

    getTagMessageError() {
        return cy.get('span.error>p.response').first()
    }

    clickBreadcrumbTag() {
        return cy.get('header>h2.gh-canvas-title>a')
            .first().click()
    }

    getTagModalHeader() {
        return cy.get('section>header.modal-header').first()
    }

    clickButtonFooterModalLeaveTagForm() {
        return cy.get('div.modal-footer>button.gh-btn.gh-btn-red')
            .first().click()
    }

    fillTagNameInput(contentInput) {
        return cy.get('input#tag-name.gh-input').first().focus()
            .type(contentInput, { force: true })
    }

    cleanFillTagNameInput(contentInput) {
        return cy.get('input#tag-name.gh-input').first().focus()
            .clear({ force: true }).type(contentInput, { force: true })
    }

    fillTagColorInput(contentInput) {
        return cy.get('div.input-color>input').first()
            .type(contentInput)
    }

    fillTagDescription(contentInput) {
        return cy.get('textarea.gh-input.gh-tag-details-textarea').first()
            .type(contentInput)
    }

    getTagTitle() {
        return cy.get('h2.gh-canvas-title');
    }

    getTagListTitle() {
        return cy.get('section>ol>li').find("h3.gh-tag-list-name")
    }

    clickButtonDeleteTag() {
        return cy.get('button[data-test-button~="delete-tag"]')
            .first().click()
    }

    clickButtonModalCancelTag() {
        return cy.get('div.modal-footer>button[data-test-button~="cancel"]')
            .first().click()
    }

    clickTagModalDeleteButton() {
        return cy.get('div.modal-footer>button[data-test-button~="confirm"]')
            .first().click()
    }

}

module.exports = Tags