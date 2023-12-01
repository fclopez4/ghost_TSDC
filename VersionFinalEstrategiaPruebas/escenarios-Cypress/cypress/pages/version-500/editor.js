class Editor {

    getEstatusTittle() {
        return cy.get('.gh-editor-post-status').first()
    }

    fillTitle(titlePost, placeHolder) {
        return cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
            .should('have.attr', 'placeholder', placeHolder).type(titlePost)
    }

    clearTitle(placeHolder) {
        return cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
            .should('have.attr', 'placeholder', placeHolder).clear()
    }

    fillContent(contentPost) {
        return cy.get('[data-kg="editor"]').click().type(contentPost)
    }

    getTitle() {
        return cy.get("textarea.gh-editor-title.ember-text-area.gh-input.ember-view")
    }

    clickPublish() {
        return cy.get('button').contains('Publish').click()
    }

    clickButtonFinalReview() {
        return cy.get('button').contains('final review').click()
    }

    clickButtonPublishRighNow() {
        return cy.get('button.gh-btn-large:nth-child(1)').click()
    }

    clickOptionMore(optionName) {
        cy.get('[data-kg="editor"]').type('{enter}').wait(1000)
        cy.get('[aria-label="Add a card"]').click()
        return cy.get(`[title="${optionName}"]`).click()
    }

    clickButtonBackEditor() {
        return cy.get('a.ember-view.gh-btn-editor.gh-editor-back-button').click()
    }

    clickUpdate() {
        return cy.get('button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger > span').click()
    }

    uploadImage(fileName) {
        cy.get('input[type="file"]').eq(1).selectFile({
            contents: 'cypress/fixtures/imagen.JPG',
            fileName: fileName + '.jpg',
        }, { force: true })
    }

    getImage(fileName) {
        return cy.get('img').should(($imgs) => {
            const imagenConNombre = $imgs.filter((index, img) => {
                const src = img.getAttribute('src');
                return src.includes(fileName);
            });
            return imagenConNombre;
        })
    }

    getModalHeaderMessage() {
        return cy.get('header.modal-header').first()
    }

    getButtonPageSettings() {
        return cy.get('button.settings-menu-toggle[title="Settings"]').first()
    }

    getButtonDeletePage() {
        return cy.get('div.settings-menu-delete-button>button').first()
    }

    getButtonModalDeletePage() {
        return cy.get('div.modal-footer>button')
            .contains('Delete')
            .first()
    }

    clickUpdatePublished() {
        return cy.get('.gh-publish-header > .flex > .gh-btn > span').click()
    }

    clickSave() {
        return cy.get('button.gh-btn.gh-btn-editor.gh-publish-trigger.green.ember-view').click()
    }

    clickButtonSettings() {
        return cy.get('button.settings-menu-toggle[title="Settings"]').click()
    }

    clickButtonDeleteSettings() {
        return cy.get('.settings-menu-delete-button').click()
    }

    clickConfirmDeleteSettings() {
        return cy.get('.modal-content>.modal-footer>.gh-btn-red').click()
    }
    
    clickCancelDeleteSettings() {
        return cy.get('.modal-content>.modal-footer>.gh-btn').contains('Cancel').click()
    }
}

module.exports = Editor