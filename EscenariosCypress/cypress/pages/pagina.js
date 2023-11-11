
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

    getLinkPageByTitle(namePost) {
        return cy.get("li>a.ember-view.permalink.gh-list-data.gh-post-list-title")
            .contains(namePost)
            .first()
    }

    getListLinkPageByTitle() {
        return cy.get("li>a.ember-view.permalink.gh-list-data.gh-post-list-title")
            .find("h3.gh-content-entry-title")
    }

    
}

module.exports = Pagina