import BoletinPage from "../../pages/version-500/boletin"
import Login from "../../pages/version-500/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const newsLetterPage = new BoletinPage()

describe("EP043 Crear Newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        let indicator = 'F005-EP017';
        before(() => {
            cy.viewport(550, 750);
            login.insertLogin()
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            newsLetterPage.visit()
            cy.wait(1000)
            newsLetterPage.clickNewLetter();
            login.tomarPantallazo(indicator,'02')
        })

        context("When I create a newsletter", () => {
            let size = 0;
            beforeEach(() => {
                cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                    size = $divs.length;
                });
                let name = faker.word.adjective(4);
                let description = faker.lorem.paragraph(1);
                newsLetterPage.fillTagById('#newsletter-title', name)
                newsLetterPage.fillTagById('#newsletter-description', description)
                newsLetterPage.clickCreate();
                login.tomarPantallazo(indicator,'03')
                cy.wait(3000)
            })
            it("Then I should add a new element  to the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

    })
})

describe("EP019 Archive newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        let indicator = 'F005-EP019';
        let size = 0;
        before(() => {
            cy.viewport(550, 750);
            login.insertLogin()
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            newsLetterPage.visit();
            cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                size = $divs.length;
            });
        })

        context("When I select options newsletter", () => {
            beforeEach(() => {
                cy.viewport(550, 750);
                cy.wait(2000)
                newsLetterPage.selectSelectOptions()
                login.tomarPantallazo(indicator,'02')
                cy.wait(3000)
            })
            it("Then I should see menu options", () => {
                newsLetterPage.getMenuArchive().should('exist');
            })
        })

        context("When I select a archive option", () => {
            beforeEach(() => {
                cy.viewport(550, 750);
                cy.wait(2000)
                newsLetterPage.selectSelectOptions()
                cy.wait(2000)
                newsLetterPage.clickOnArchive()
                login.tomarPantallazo(indicator,'03')
            })
            it("Then I should see the modal confirm", () => {
                newsLetterPage.getTitleModalConfirm().should('contain.text', 'Archive newsletter');
            })
        })

        context("When I click on Archive confirm", () => {
            beforeEach(() => {
                cy.viewport(550, 750);
                cy.wait(2000)
                newsLetterPage.selectSelectOptions()
                cy.wait(2000)
                newsLetterPage.clickOnArchive()
                cy.wait(2000)
                newsLetterPage.clickOnArchiveConfirm()
                login.tomarPantallazo(indicator,'04')
            })
            it("Then I should remove the Newsletter from the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size-1));
            })
        })
    })
})