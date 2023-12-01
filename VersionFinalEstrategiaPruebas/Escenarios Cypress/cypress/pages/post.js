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
        return cy.get(".posts-list.gh-list.feature-memberAttribution")
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

    verifyPostPublished(namePost) {
        this.visit();
        cy.wait(1000)
        this.clickFilterByTypeAndName('All posts', 'Published posts');
        return expect(this.getPostByTitle(namePost)).to.exist
    }

    notificactionUpdateFailed(){
        return cy.get(`.gh-alert.gh-alert-red>.gh-alert-content`).should('contain.text', 'Title cannot be longer than 255 characters');
    }
}



module.exports = Post;