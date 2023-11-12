
class Pagina {
    visit() {
        cy.visit("/ghost/#/pages")
        cy.wait(1000)
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    clickNewPage() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').contains('New').click()
    }

    clickFilterByTypeAndName(type, name) {
        cy.get(".ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger").contains(type).click()
        return cy.get(".ember-power-select-option").contains(name).click()
    }

    getPageByTitle(namePost) {
        return cy.get(".posts-list.gh-list.feature-memberAttribution")
            .find(".gh-content-entry-title")
            .contains(namePost)
            .first()
    }

    getPageLinkByTitle(namePost) {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")
            .contains(namePost)
            .first()
    }

    getListPageTitles() {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")
            .find("h3.gh-content-entry-title")
    }

    getButtonDeletePage() {
        return cy.get('ul.gh-posts-context-menu>li>button')
            .contains('Delete')
            .first()
    }

    getButtonModalDeletePage() {
        return cy.get('div.modal-footer>button')
            .contains('Delete')
            .first()
    }

    getButtonModalCancelPage() {
        return cy.get('div.modal-footer>button')
            .contains('Cancel')
            .first()
    }

    getFilterButtonByType() {
        return cy.get('div.gh-contentfilter-menu.gh-contentfilter-type')
            .first()
    }

    getFilterButtonByDraftPage() {
        return cy.get('div.gh-contentfilter-menu-dropdown>ul>li')
            .contains('Draft pages')
            .first()
    } 

    getFilterButtonByPublishedPage() {
        return cy.get('div.gh-contentfilter-menu-dropdown>ul>li')
            .contains('Published pages')
            .first()
    } 

    getListPageType() {
        return cy.get("li>a>p.gh-content-entry-status")
    }
    
}

module.exports = Pagina