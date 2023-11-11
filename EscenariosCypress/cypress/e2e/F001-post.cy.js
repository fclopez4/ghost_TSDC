import Post from "../pages/post"
import Login from "../pages/login"
import Editor from "../pages/editor"
import { faker } from '@faker-js/faker'

const post = new Post()
const login = new Login()
const editor = new Editor()

describe("scenery #2 create post", () => {
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
                editor.uploadImage(nameImage)
                cy.wait(2000)
            })
            it("Then I should see the post published", () => {
                expect(editor.getImage(nameImage)).to.exist;
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
            })
        })

    })

})

describe("scenery #3 edit Post", () => {
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
            })
        });

    })
})

describe("scenery #4 delete Post", () => {
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

        context("when I create a post and I want to delete", () => {
            const namePost = faker.animal.cow();
            beforeEach(() => {
                post.createPost(namePost);
                post.getPostByTitle(namePost).scrollIntoView().rightclick();
                post.clickButtonDelete();
                post.clickConfirmDelete();
                cy.wait(1000)
            })

            it("Then I see the alert Post deleted successfully", () => {
                post.getTitle().should("contain.text", "Posts")
            })

            it("And it does not have to exist", () => {
                post.searhNotExistPostByTittle(namePost).should('not.exist')
            })
        })

        context("when I want to create a post and then delete it, but I cancel it ", () => {
            const namePost = faker.animal.crocodilia();
            beforeEach(() => {
                post.createPost(namePost);
                post.getPostByTitle(namePost).scrollIntoView().rightclick();
                post.clickButtonDelete();
                post.clickcancelDelete();
                cy.wait(1000)
            })

            it("Then I see the post", () => {
                expect(post.getPostByTitle(namePost)).to.exist;
            })
        })
    })
});

describe("scenery #5 list post", () => {
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

        context("when I visit the page post I should see a post title", () => {
            it("Then I see the title post", () => {
                post.getTitle().should("contain.text", "Posts")
            })
        })

        context("When I visit the page post I should see a list post ", () => {
            it("Then I should see a list of post", () => {
                post.getListPosts().should("exist")
            })
        })

        context("When I visit the page post and y filter by draft", () => {
            beforeEach(() => {
                post.clickFilterByTypeAndName('All posts', 'Draft posts');
            })
            it("Then I should see a page with type draft", () => {
                cy.url().should('include', 'type=draft');
            })
        })

        context("When I visit the page post and y filter by Members only", () => {
            beforeEach(() => {
                post.clickFilterByTypeAndName('All access', 'Members-only');
            })
            it("Then I should see a page with visibility members", () => {
                cy.url().should('include', 'visibility=members');
            })
        })

        context("When I visit the page post and y order by olders first", () => {
            beforeEach(() => {
                post.clickFilterByTypeAndName('Newest first', 'Oldest first');
            })
            it("Then I should see a page with visibility members", () => {
                cy.url().should('include', 'order=published_at%20asc');
            })
        })
    })
});
