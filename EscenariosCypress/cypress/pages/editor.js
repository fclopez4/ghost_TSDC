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
        return cy.get('.kg-prose').click().type(contentPost)
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
        return cy.get('[data-test-button="confirm-publish"]').click()
    }

    clickOptionMore(optionName) {
        cy.get('.kg-prose').click()
        cy.get('[aria-label="Add a card"]').click()
        return cy.get('button').contains(optionName).click()
    }

    uploadImage(fileName) {
        cy.get('input[type="file"]').eq(1).selectFile({
            contents: 'cypress/fixtures/imagen.JPG',
            fileName: fileName + '.jpg',
        },{ force: true })
    }

    getImage(fileName){
        return cy.get('img').should(($imgs) => {
            const imagenConNombre = $imgs.filter((index, img) => {
                const src = img.getAttribute('src');
                return src.includes(fileName);
            });
            return imagenConNombre;
        })
    }


}

module.exports = Editor