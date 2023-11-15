import Editor from "../pages/editor"

class Post {
    visit() {
        cy.visit("/ghost/#/posts")
        cy.wait(1000)
    }

    getTitle() {
        return cy.get(".gh-canvas-title").first()
    }

    getListPosts() {
        return cy.get(".posts-list.gh-list.feature-memberAttribution")
    }

    clickNewPost() {
        return cy.get('a.ember-view.gh-btn.gh-btn-primary').contains('New').click()
    }

    getPostByTitle(namePost) {
        return cy.get(".gh-list-row.gh-posts-list-item")
            .find(".gh-content-entry-title")
            .contains(namePost)
            .first()
    }

    clickFilterByTypeAndName(type, name) {
        cy.get(".ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger").contains(type).click()
        return cy.get(".ember-power-select-option").contains(name).click()
    }

    createPost(namePost) {
        const editor = new Editor()
        this.clickNewPost()
        cy.wait(1000)
        editor.fillTitle(namePost, 'Post title')
        cy.wait(1000)
        editor.fillContent(namePost)
        this.visit()
    }

    clickButtonDelete() {
        return cy.get('button').contains('Delete').click()
    }
    clickConfirmDelete() {
        return cy.get('[data-test-button="confirm"]').click();
    }

    clickcancelDelete() {
        return cy.get('[data-test-button="cancel"]').contains('Cancel').click()
    }

    searhNotExistPostByTittle(namePost) {
        return cy.get(".posts-list.gh-list.feature-memberAttribution")
            .find(".gh-content-entry-title")
            .contains(namePost)
            .should('not.exist');
    }

}

module.exports = Post