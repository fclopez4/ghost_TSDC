import { faker } from '@faker-js/faker';

import Login from "../pages/login"
import Editor from "../pages/editor"
import Pagina from "../pages/page"

const login = new Login()
const editor = new Editor()
const page = new Pagina()


describe("EP006 create page", () => {
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
                login.tomarPantallazo("F002-EP006", "1")
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
                login.tomarPantallazo("F002-EP006", "2")
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
                login.tomarPantallazo("F002-EP006", "3")
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
                cy.wait(1000)
                editor.clickOptionMore('Image');
                cy.wait(1000)
                editor.uploadImage(nameImage)
                cy.wait(2000)
            })
            it("Then I should see the page published", () => {
                expect(editor.getImage(nameImage)).to.exist;
                login.tomarPantallazo("F002-EP006", "4")
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
                login.tomarPantallazo("F002-EP006", "5")
            })
        })
    })

})

describe('EP007 edit page', () => {
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
                page.getPageLinkByTitle(pageFirstTitle).click()
                cy.wait(1000)
                editor.clearTitle('Page title')
                editor.fillTitle(pageSecondTitle, 'Page title')
                saveDraftPage()
            })

            it('Then I should see the new title in the page list', () => {
                page.getListPageTitles().contains(pageSecondTitle).should('exist')
            })
        })

        context('When I edit a page title from publish page and publish again before return to page list', () => {
            let pageFirstTitle = faker.person.jobTitle()
            let pageSecondTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                publishNewPage()
                page.clickFilterButtonBySort()
                page.clickFilterButtonByRecentlyUpdate()
                page.getPageLinkByTitle(pageFirstTitle).click()
                cy.wait(1000)
                editor.clearTitle('Page title')
                editor.fillTitle(pageSecondTitle, 'Page title')
                publishUpdatePage()
                cy.wait(1000)
                page.clickFilterButtonBySort()
                page.clickFilterButtonByRecentlyUpdate()
                cy.wait(1000)
            })

            it('Then I should see the new title in the page list', () => {
                page.getListPageTitles().contains(pageSecondTitle).should('exist')
            })
        })

    });
})

describe('EP008 delete page', () => {
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

        context('When I click on delete button and I click on modal delete button from draft page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                saveDraftPage()
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                page.clickButtonDeletePage()
                page.clickButtonModalDeletePage()
                cy.wait(1000)
            })

            it('Then I should not be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('not.exist')
            })
        })

        context('When I click on delete button and I click on modal cancel button from draft page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                saveDraftPage()
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                page.clickButtonDeletePage()
                page.clickButtonModalCancelPage()
                cy.wait(1000)
            })

            it('Then I should be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('exist')
            })
        })

        context('When I click on delete button and I click on modal delete button from published page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                publishNewPage()
                page.clickFilterButtonBySort()
                page.clickFilterButtonByRecentlyUpdate()
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                page.clickButtonDeletePage()
                page.clickButtonModalDeletePage()
                cy.wait(1000)
            })

            it('Then I should be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('not.exist')
            })
        })

        context('When I click on delete button and I click on modal cancel button from published page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                publishNewPage()
                page.clickFilterButtonBySort()
                page.clickFilterButtonByRecentlyUpdate()
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                page.clickButtonDeletePage()
                page.clickButtonModalCancelPage()
            })

            it('Then I should be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('exist')
            })
        })

    });
})

describe('EP009 list page', () => {
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
        })

        context('When I go to the page path and create some draft pages', () => {
            beforeEach(() => {
                page.visit()
                cy.wait(1000)
                createDummyPageData(faker.person.jobTitle())
                saveDraftPage()
                createDummyPageData(faker.person.jobTitle())
                saveDraftPage()
                page.visit()
                cy.wait(1000)
            })

            it('Then I should be see a page list', () => {
                page.getListPageTitles().should("exist")
            })
        })

        context('When I go to the page path and create some published pages', () => {
            beforeEach(() => {
                page.visit()
                cy.wait(1000)
                createDummyPageData(faker.person.jobTitle())
                publishNewPage()
                createDummyPageData(faker.person.jobTitle())
                publishNewPage()
                cy.wait(1000)
            })

            it('Then I should be see a page list', () => {
                page.getListPageTitles().should("exist")
            })
        })

        context('When I go to the page path and click on draft type filter', () => {
            beforeEach(() => {
                page.visit()
                cy.wait(1000)
                page.clickFilterButtonByType()
                page.clickFilterButtonByDraftPage()
            })

            it('Then I should be see only a page list with type draft', () => {
                page.getListPageType().contains("published").should("not.exist")
            })
        }) 

        context('When I go to the page path and click on published type filter', () => {
            beforeEach(() => {
                page.visit()
                cy.wait(1000)
                page.clickFilterButtonByType()
                page.clickFilterButtonByPublishedPage()
            })

            it('Then I should be see only a page list with type published', () => {
                page.getListPageType().contains("Draft").should("not.exist")
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