import { faker } from '@faker-js/faker';

import Login from "../pages/login"
import Editor from "../pages/editor"
import Pagina from "../pages/pagina"

const login = new Login()
const editor = new Editor()
const page = new Pagina()


describe("scenery #6 create page", () => {
    context('Given I go to page page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

        context("When I click on new pagina button", () => {
            beforeEach(() => {
                page.clickNewPage()
                cy.wait(1000)
            })
            it("Then I should see a new  page", () => {
                editor.getEstatusTittle().should("contain.text", "New")
            })
        })

        context("When I fill the title and content", () => {
            const namePage = faker.lorem.words()
            beforeEach(() => {
                page.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(faker.lorem.paragraphs())
            })
            it("Then I should see the title and content filled", () => {
                editor.getTitle().should('have.value', namePage);
            })
        })

        context('When I fill the page and publish', () => {
            const namePage = faker.lorem.words()
            beforeEach(() => {
                page.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(faker.lorem.paragraphs())
                editor.clickPublish()
                cy.wait(1000)
                editor.clickButtonFinalReview()
                cy.wait(1000)
                editor.clickButtonPublishRighNow();
                cy.wait(1000)
                page.visit()
                page.clickFilterByTypeAndName('All pages', 'Published pages');
                cy.wait(1000)
            })
            it("Then I should see the page published", () => {
                expect(page.getPageByTitle(namePage)).to.exist
            })
        })

        context('When I add', () => {
            const namePage = faker.lorem.words();
            const nameImage = faker.lorem.words();
            beforeEach(() => {
                page.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.clickOptionMore('Image');
                editor.uploadImage(nameImage)
                cy.wait(2000)
            })
            it("Then I should see the page published", () => {
                expect(editor.getImage(nameImage)).to.exist;
            })
        })


        context('When I fill the page and dont publish to be create page', () => {
            const namePage = faker.lorem.words()
            beforeEach(() => {
                page.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(faker.lorem.paragraphs())
                cy.wait(1000)
                page.visit()
            })
            it("Then I should see the page published", () => {
                page.getPageByTitle(namePage).should("contain.text", namePage)
            })
        })
    })

})

describe('scenery #7 edit page', () => {
    context('Given I go to page page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

        context('When I edit a page title from draft page and return to page list', () => {
            let pageFirstTitle = faker.person.jobTitle()
            let pageSecondTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                saveDraftPage()
                page.getLinkPageByTitle(pageFirstTitle).click()
                cy.wait(1000)
                editor.clearTitle('Page title')
                editor.fillTitle(pageSecondTitle, 'Page title')
                saveDraftPage()
            })

            it('Then I should see the new title in the page list', () => {
                page.getListLinkPageByTitle().contains(pageSecondTitle).should('exist')
            })
        })

        context('When I edit a page title from publish page and publish again before return to page list', () => {
            let pageFirstTitle = faker.person.jobTitle()
            let pageSecondTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                publishNewPage()
                page.getLinkPageByTitle(pageFirstTitle).click()
                cy.wait(1000)
                editor.clearTitle('Page title')
                editor.fillTitle(pageSecondTitle, 'Page title')
                publishUpdatePage()
            })

            it('Then I should see the new title in the page list', () => {
                page.getListLinkPageByTitle().contains(pageSecondTitle).should('exist')
            })
        })


    });
})


export function createDummyPageData(pageTitle) {
    page.clickNewPage()
    cy.wait(1000)
    editor.fillTitle(pageTitle, 'Page title')
    editor.fillContent(faker.lorem.sentences())
}

export function saveDraftPage(){
    editor.clickButtonBackEditor()
    cy.wait(1000)
}

export function publishNewPage(){
    editor.clickPublish()
    editor.clickButtonFinalReview()
    editor.clickButtonPublishRighNow()
    cy.wait(1000)
    page.visit()
}

export function publishUpdatePage(){
    editor.clickUpdate()
    cy.wait(1000)
    page.visit()
}