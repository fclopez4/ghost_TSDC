
class Page {

    visit() {
        cy.visit("/ghost/#/pages")
        cy.wait(1000)
    }

    reload(){
        cy.reload()
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    getPageByTitle(namePost) {
        return cy.get(".posts-list.gh-list.feature-memberAttribution")
            .find(".gh-content-entry-title")
            .contains(namePost)
            .first()
    }

    getPageLinks() {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")            
    }

    getListPageTitles() {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")
            .find("h3.gh-content-entry-title")
    }

    getListPageType() {
        return cy.get("li>a>p.gh-content-entry-status")
    }

    getNotificationAlert(){
        return cy.get(`.gh-alert.gh-alert-red>.gh-alert-content`)
    }

    clickPageListLink(contentInput){
        return this.getPageLinks().contains(contentInput).click()
    }

    clickNewPage() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').contains('New').click()
    }

    clickFilterByTypeAndName(type, name) {
        cy.get(".ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger").contains(type).click()
        return cy.get(".ember-power-select-option").contains(name).click()
    }
    
    clickButtonDeletePage() {
        return cy.get('ul.gh-posts-context-menu>li>button')
            .contains('Delete')
            .first().click()
    }

    clickButtonModalDeletePage() {
        return cy.get('div.modal-footer>button')
            .contains('Delete')
            .first().click()
    }

    clickButtonModalCancelPage() {
        return cy.get('div.modal-footer>button')
            .contains('Cancel')
            .first().click()
    }

    clickFilterButtonBySort() {
        return cy.get('div.gh-contentfilter-menu.gh-contentfilter-sort')
            .first().click()
    }

    clickFilterButtonByRecentlyUpdate() {
        return cy.get('div.gh-contentfilter-menu-dropdown>ul>li')
            .contains('Recently updated')
            .first().click()
    }

    clickFilterButtonByType() {
        return cy.get('div.gh-contentfilter-menu.gh-contentfilter-type')
            .first().click()
    }

    clickFilterButtonByDraftPage() {
        return cy.get('div.gh-contentfilter-menu-dropdown>ul>li')
            .contains('Draft pages')
            .first().click()
    } 

    clickFilterButtonByPublishedPage() {
        return cy.get('div.gh-contentfilter-menu-dropdown>ul>li')
            .contains('Published pages')
            .first().click()
    } 
    
}

module.exports = Page