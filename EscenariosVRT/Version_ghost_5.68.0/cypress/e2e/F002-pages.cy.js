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
                login.tomarPantallazo("F002-EP006", "3")
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
        let indicator = 'F002-EP007';

        before(() => {
            login.insertLogin()
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
            login.tomarPantallazo(indicator,'02')
        })

        context('When I edit a page title from draft page and return to page list', () => {
            let pageFirstTitle = faker.person.jobTitle()
            let pageSecondTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                login.tomarPantallazo(indicator,'03')
                saveDraftPage()
                login.tomarPantallazo(indicator,'04')
                page.getPageLinkByTitle(pageFirstTitle).click()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'05')
                editor.clearTitle('Page title')
                login.tomarPantallazo(indicator,'06')
                editor.fillTitle(pageSecondTitle, 'Page title')
                login.tomarPantallazo(indicator,'07')
                saveDraftPage()
                login.tomarPantallazo(indicator,'08')
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
                login.tomarPantallazo(indicator,'09')
                publishNewPage()
                login.tomarPantallazo(indicator,'10')
                page.clickFilterButtonBySort()
                login.tomarPantallazo(indicator,'11')
                page.clickFilterButtonByRecentlyUpdate()
                login.tomarPantallazo(indicator,'12')
                page.getPageLinkByTitle(pageFirstTitle).click()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'13')
                editor.clearTitle('Page title')
                login.tomarPantallazo(indicator,'14')
                editor.fillTitle(pageSecondTitle, 'Page title')
                login.tomarPantallazo(indicator,'15')
                publishUpdatePage()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'16')
                page.clickFilterButtonBySort()
                login.tomarPantallazo(indicator,'17')
                page.clickFilterButtonByRecentlyUpdate()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'18')
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
        let indicator = 'F002-EP008';

        before(() => {
            login.insertLogin()
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
            login.tomarPantallazo(indicator,'02')
        })

        context('When I click on delete button and I click on modal delete button from draft page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                login.tomarPantallazo(indicator,'02')
                saveDraftPage()
                login.tomarPantallazo(indicator,'03')
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'04')
                page.clickButtonDeletePage()
                login.tomarPantallazo(indicator,'05')
                page.clickButtonModalDeletePage()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'06')
            })

            it('Then I should not be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('not.exist')
            })
        })

        context('When I click on delete button and I click on modal cancel button from draft page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                login.tomarPantallazo(indicator,'07')
                saveDraftPage()
                login.tomarPantallazo(indicator,'08')
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'09')
                page.clickButtonDeletePage()
                login.tomarPantallazo(indicator,'10')
                page.clickButtonModalCancelPage()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'11')
            })

            it('Then I should be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('exist')
            })
        })

        context('When I click on delete button and I click on modal delete button from published page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                login.tomarPantallazo(indicator,'12')
                publishNewPage()
                login.tomarPantallazo(indicator,'13')
                page.clickFilterButtonBySort()
                login.tomarPantallazo(indicator,'14')
                page.clickFilterButtonByRecentlyUpdate()
                login.tomarPantallazo(indicator,'15')
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'16')
                page.clickButtonDeletePage()
                login.tomarPantallazo(indicator,'17')
                page.clickButtonModalDeletePage()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'18')
            })

            it('Then I should be see that page name on the page list', () => {
                page.getListPageTitles().contains(pageFirstTitle).should('not.exist')
            })
        })

        context('When I click on delete button and I click on modal cancel button from published page', () => {
            let pageFirstTitle = faker.person.jobTitle()
            beforeEach(() => {
                createDummyPageData(pageFirstTitle)
                login.tomarPantallazo(indicator,'19')
                publishNewPage()
                login.tomarPantallazo(indicator,'20')
                page.clickFilterButtonBySort()
                login.tomarPantallazo(indicator,'21')
                page.clickFilterButtonByRecentlyUpdate()
                login.tomarPantallazo(indicator,'22')
                page.getPageLinkByTitle(pageFirstTitle).rightclick()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'23')
                page.clickButtonDeletePage()
                login.tomarPantallazo(indicator,'24')
                page.clickButtonModalCancelPage()
                login.tomarPantallazo(indicator,'25')
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
        let indicator = 'F002-EP009';

        before(() => {
            login.insertLogin()
            login.tomarPantallazo(indicator,'01')
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
                login.tomarPantallazo(indicator,'02')
                createDummyPageData(faker.person.jobTitle())
                login.tomarPantallazo(indicator,'03')
                saveDraftPage()
                login.tomarPantallazo(indicator,'04')
                createDummyPageData(faker.person.jobTitle())
                login.tomarPantallazo(indicator,'05')
                saveDraftPage()
                login.tomarPantallazo(indicator,'06')
                page.visit()
                login.tomarPantallazo(indicator,'07')
            })

            it('Then I should be see a page list', () => {
                page.getListPageTitles().should("exist")
            })
        })

        context('When I go to the page path and create some published pages', () => {
            beforeEach(() => {
                page.visit()
                login.tomarPantallazo(indicator,'08')
                createDummyPageData(faker.person.jobTitle())
                login.tomarPantallazo(indicator,'09')
                publishNewPage()
                login.tomarPantallazo(indicator,'10')
                createDummyPageData(faker.person.jobTitle())
                login.tomarPantallazo(indicator,'11')
                publishNewPage()
                login.tomarPantallazo(indicator,'12')
            })

            it('Then I should be see a page list', () => {
                page.getListPageTitles().should("exist")
            })
        })

        context('When I go to the page path and click on draft type filter', () => {
            beforeEach(() => {
                page.visit()
                login.tomarPantallazo(indicator,'13')
                page.clickFilterButtonByType()
                login.tomarPantallazo(indicator,'14')
                page.clickFilterButtonByDraftPage()
                login.tomarPantallazo(indicator,'15')
            })

            it('Then I should be see only a page list with type draft', () => {
                page.getListPageType().contains("published").should("not.exist")
            })
        }) 

        context('When I go to the page path and click on published type filter', () => {
            beforeEach(() => {
                page.visit()
                login.tomarPantallazo(indicator,'16')
                page.clickFilterButtonByType()
                login.tomarPantallazo(indicator,'17')
                page.clickFilterButtonByPublishedPage()
                login.tomarPantallazo(indicator,'18')
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