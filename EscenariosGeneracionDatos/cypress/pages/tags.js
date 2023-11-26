class Tags {
    constructor() {
        this.url = "/ghost/#/tags"
    }

    visit() {
        cy.visit(this.url)
        cy.wait(1000)
    }

    reload(){
        cy.reload()
    }

    getButtonNewTag() {
        return cy.get('section.view-actions>a.ember-view.gh-btn.gh-btn-primary').first()
    }

    getTagTitleInput(){
        return cy.get('input#tag-name.gh-input')
    }

    getTagDescriptionInput(){
        return cy.get('textarea#tag-description.gh-input').first()
    }

    getTagMessageError() {
        return cy.get('span.error>p.response').first()
    }

    getTagModalHeader() {
        return cy.get('header.modal-header').first()
    }

    getTagTitle() {
        return cy.get('h2.gh-canvas-title');
    }

    getTagListTitle() {
        return cy.get('section>ol>li').find("h3.gh-tag-list-name")
    }

    getTagNameError(){
        return cy.get('.mr2 > .error > :nth-child(1)')
    }

    getTagDescriptionError(){
        return cy.get('.no-margin > .response')
    }

    getTagMetadataTitle(){
        return cy.get('#meta-title')
    }

    getTagMetadataDescription(){
        return cy.get('#meta-description')
    }

    getTagMetadataUrl(){
        return cy.get('#canonical-url')
    }

    getTagMetadataTitleError(){
        return cy.get(':nth-child(1) > .response')
    }

    getTagMetadataDescriptionError(){
        return cy.get('.gh-seo-settings-left > :nth-child(2) > .response')
    }

    getTagXcardTitle(){
        return cy.get('#twitter-title')
    }

    getTagXcardDescription(){
        return cy.get('#twitter-description')
    }

    getTagXcardError(){
        return cy.get('.gh-alert')
    }

    getTagFacebookTitle(){
        return cy.get('#og-title')
    }

    getTagFacebookDescription(){
        return cy.get('#og-description')
    }

    getTagFacebookError(){
        return cy.get('.gh-alert')
    }

    getTagCodeInjectionHeader(){
        return cy.get('#tag-setting-codeinjection-head > .CodeMirror > .CodeMirror-scroll')
    }

    getTagCodeInjectionFooter(){
        return cy.get('#tag-setting-codeinjection-foot > .CodeMirror > .CodeMirror-scroll')
    }


    clickButtonGoogleMetadata(){
        return cy.get(':nth-child(1) > .gh-expandable-header > .gh-btn > span').click()
    }

    clickButtonXcard(){
        return cy.get(':nth-child(2) > .gh-expandable-header > .gh-btn > span').click()
    }

    clickButtonFacebookCard(){
        return cy.get(':nth-child(3) > .gh-expandable-header > .gh-btn > span').click()
    }

    clickButtonCodeInjection(){
        return cy.get(':nth-child(4) > .gh-expandable-header > .gh-btn > span').click()
    }

    clickButtonSaveTag() {
        return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
            .first().click()
    }

    clickButtonNewTag() {
        return cy.get('section.view-actions>a.ember-view.gh-btn.gh-btn-primary')
            .first().click()
    }

    clickBreadcrumbTag() {
        return cy.get('div.gh-canvas-breadcrumb>a')
            .first().click()
    }

    clickButtonFooterModalLeaveTagForm() {
        return cy.get('div.modal-footer>button.gh-btn.gh-btn-red')
            .first().click()
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


    fillTagNameInput(contentInput) {
        return this.getTagTitleInput().type(contentInput, { parseSpecialCharSequences: false })
    }

    cleanFillTagNameInput(contentInput) {
        return this.getTagTitleInput().clear().type(contentInput)
    }

    fillTagColorInput(contentInput) {
        return cy.get('div.input-color>input').first()
            .type(contentInput)
    }

    fillTagDescription(contentInput) {
        return this.getTagDescriptionInput().type(contentInput, { parseSpecialCharSequences: false })
    }

    fillTagMetadataTitle(contentInput){
        return this.getTagMetadataTitle().type(contentInput)
    }

    fillTagMetadataDescription(contentInput){
        return this.getTagMetadataDescription().type(contentInput)
    }

    fillTagMetadataUrl(contentInput){
        return this.getTagMetadataUrl().type(contentInput)
    }
    
    fillTagXcardTitle(contentInput){
        return this.getTagXcardTitle().type(contentInput)
    }

    fillTagXcardDescription(contentInput){
        return this.getTagXcardDescription().type(contentInput)
    }

    fillTagFacebookTitle(contentInput){
        return this.getTagFacebookTitle().type(contentInput)
    }

    fillTagFacebookDescription(contentInput){
        return this.getTagFacebookDescription().type(contentInput)
    }

    fillTagCodeInjectionHeader(contentInput) {
        return this.getTagCodeInjectionHeader().click().type(contentInput, { parseSpecialCharSequences: false })
    }

    fillTagCodeInjectionFooter(contentInput) {
        return this.getTagCodeInjectionFooter().click().wait(3000).type(contentInput, { parseSpecialCharSequences: false })
    }

}

module.exports = Tags