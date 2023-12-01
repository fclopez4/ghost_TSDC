
class Page {
    visit() {
        const url = cy.env('urlGhost500')
        Cypress.config('baseUrl', url)
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

    getPageByTitle(name) {
        return cy.get(".gh-list-row.gh-posts-list-item")
            .find(".gh-content-entry-title")
            .contains(name)
            .first()
    }

    getPageLinkByTitle(name) {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")
            .contains(name)
            .first()
    }

    getListPageTitles() {
        return cy.get("li>a.permalink.gh-list-data.gh-post-list-title")
            .find("h3.gh-content-entry-title")
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

    getListPageType() {
        return cy.get("li>a>p.gh-content-entry-status")
    }
    
}

module.exports = Page