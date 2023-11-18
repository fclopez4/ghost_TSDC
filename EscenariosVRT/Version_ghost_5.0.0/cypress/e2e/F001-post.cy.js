import Post from "../pages/post"
import Login from "../pages/login"
import Editor from "../pages/editor"
import { faker } from '@faker-js/faker'

const post = new Post()
const login = new Login()
const editor = new Editor()

describe("EP002 create post", () => {
    context('Given I go to post page', () => {
        let cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            post.visit()
        })

        context("When I click on new post button", () => {
            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
            })
            it("Then I should see a new post page", () => {
                editor.getEstatusTittle().should("contain.text", "New")
                login.tomarPantallazo("F001-EP002", "01")
            })
        })

        context("When I fill the title and content", () => {
            const namePost = faker.animal.bear()
            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
                editor.fillTitle(namePost, 'Post title')
                editor.fillContent('Content post 1')
            })
            it("Then I should see the title and content filled", () => {
                editor.getTitle().should('have.value', namePost);
                login.tomarPantallazo("F001-EP002", "02")
            })
        })

        context('When I fill the blog and publish', () => {
            const namePost = faker.animal.bear()
            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
                editor.fillTitle(namePost, 'Post title')
                editor.fillContent('Content post 1')
                editor.clickPublish()
                cy.wait(1000)
                editor.clickButtonFinalReview()
                cy.wait(1000)
                editor.clickButtonPublishRighNow();
                cy.wait(1000)
                post.visit()
                post.clickFilterByTypeAndName('All posts', 'Published posts');
                cy.wait(1000)
            })
            it("Then I should see the post published", () => {
                expect(post.getPostByTitle(namePost)).to.exist
                login.tomarPantallazo("F001-EP002", "03")
            })
        })

        context('When I add', () => {
            const namePost = faker.animal.bear();
            const nameImage = faker.animal.bear();
            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
                editor.fillTitle(namePost, 'Post title')
                editor.clickOptionMore('Image');
                cy.wait(1000)
                editor.clickOptionMore('Image');
                cy.wait(1000)
                editor.uploadImage(nameImage)
                cy.wait(2000)
            })
            it("Then I should see the post published", () => {
                expect(editor.getImage(nameImage)).to.exist;
                login.tomarPantallazo("F001-EP002", "04")
            })
        })


        context('When I fill the blog and dont publish to be create post', () => {
            const namePost = faker.animal.bird()
            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
                editor.fillTitle(namePost, 'Post title')
                editor.fillContent(faker.animal.bird())
                cy.wait(1000)
                post.visit()
            })
            it("Then I should see the post published", () => {
                post.getPostByTitle(namePost).should("contain.text", namePost)
                login.tomarPantallazo("F001-EP002", "05")
            })
        })

    })

})

describe("EP003 edit Post", () => {
    context('Given I go to post page', () => {
        let cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            post.visit()
        })

        context("When I click on post to edit", () => {
            const namePost = faker.animal.dog()

            beforeEach(() => {
                post.createPost(namePost);
                post.getPostByTitle(namePost).click()
                cy.wait(1000)
            })
            it("Then I should see a edit post page", () => {
                editor.getEstatusTittle().should("contain.text", "- Saved")
                login.tomarPantallazo("F001-EP003", "01")
            })
        })

        context("When I click on post published to edit", () => {
            const namePost = faker.animal.dog()

            beforeEach(() => {
                post.clickNewPost()
                cy.wait(1000)
                editor.fillTitle(namePost, 'Post title')
                editor.fillContent('Content post 1')
                editor.clickPublish()
                cy.wait(1000)
                editor.clickButtonFinalReview()
                cy.wait(1000)
                editor.clickButtonPublishRighNow();
                cy.wait(1000)
                post.visit()
                post.clickFilterByTypeAndName('All posts', 'Published posts');
                cy.wait(1000)
                post.getPostByTitle(namePost).click()
                cy.wait(1000)
            })
            it("Then I should see a edit post page", () => {
                editor.getEstatusTittle().should("contain.text", "Published")
                login.tomarPantallazo("F001-EP003", "02")
            })
        })

        context("when I update a post and I want to update de name", () => {
            const namePost = faker.animal.cat()
            const namePostUpdate = faker.animal.cat()
            beforeEach(() => {
                post.createPost(namePost);
                post.getPostByTitle(namePost).click()
                cy.wait(1000)
                editor.clearTitle('Post title')
                editor.fillTitle(namePostUpdate, 'Post title')
                editor.fillContent(faker.animal.cetacean())
                editor.clickPublish()
                cy.wait(1000)
                editor.clickButtonFinalReview()
                cy.wait(1000)
                editor.clickButtonPublishRighNow();
                cy.wait(1000)
                post.visit()
                post.clickFilterByTypeAndName('All posts', 'Published posts');
                cy.wait(1000)
            })
            it("Then I should see the post published wiht de new name", () => {
                post.getPostByTitle(namePostUpdate).should("contain.text", namePostUpdate)
                login.tomarPantallazo("F001-EP003", "03")
            })
        });

        context("when I update a post and I want to update de name in state draft", () => {
            const namePost = faker.animal.cetacean()
            const namePostUpdate = faker.animal.cetacean()
            beforeEach(() => {
                post.createPost(namePost);
                post.getPostByTitle(namePost).click()
                cy.wait(1000)
                editor.clearTitle('Post title')
                editor.fillTitle(namePostUpdate, 'Post title')
                editor.fillContent(faker.animal.cetacean())
                editor.clickPublish()
                post.visit()
            })
            it("Then I should see the post wiht de new name", () => {
                post.getPostByTitle(namePostUpdate).should("contain.text", namePostUpdate)
                login.tomarPantallazo("F001-EP003", "04")
            })
        });

    })

})