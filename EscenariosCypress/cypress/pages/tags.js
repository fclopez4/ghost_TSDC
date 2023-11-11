class Tags {
    constructor() {
        this.url = "/ghost/#/tags"
    }

    visit() {
        cy.visit(this.url)
        cy.wait(1000)
    }

    getButtonNewTag() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').first()
    }

    getButtonSaveTag() {
        return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view').first()
    }

    getTagMessageError() {
        return cy.get('span.error>p.response').first()
    }

    getTagBreadcrumb() {
        return cy.get('div.gh-canvas-breadcrumb>a').first()
    }

    getTagModalHeader() {
        return cy.get('header.modal-header').first()
    }

    getTagFooterModalLeaveButton() {
        return cy.get('div.modal-footer>button.gh-btn.gh-btn-red').first()
    }

    getTagNameInput() {
        return cy.get('input#tag-name.gh-input').first()
    }

    getTagColorInput(){       
        return cy.get('div.input-color>input').first()
    }

    getTagDescription() {
        return cy.get('textarea.gh-input.gh-tag-details-textarea').first();
    }

    getTagTitle(){
        return cy.get('h2.gh-canvas-title');
    }

    getTagListTitle() {
        return cy.get("section>ol>li").find("h3.gh-tag-list-name")
    }
    

}

module.exports = Tags