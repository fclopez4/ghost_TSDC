import Boletin from "../../pages/version-568/boletin"
import Login from "../../pages/version-568/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const newsletterPage = new Boletin()

describe("EP043 Crear newsletter con nombre mayor a 191 caracteres - Aleatorio", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            cy.viewport(550, 750);
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            newsletterPage.visit()
            cy.wait(1000)
            newsletterPage.clickNewLetter();
        })

        context("When I create newsletter with name longer than 191 characteres", () => {
            beforeEach(() => {
                let name = faker.lorem.sentence(192);
                newsletterPage.fillTagById('#newsletter-title', name)
                newsletterPage.clickCreate();
                cy.wait(3000);
            })
            it("Then I should see the message 'Cannot be longer than 191 characters'", () => {
                newsletterPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
            })
        })

    })
})


describe("EP045 Crear newsletter con descripción mayor a 2001 caracteres - Aleatorio", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            cy.viewport(550, 750);
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            newsletterPage.visit()
            cy.wait(1000)
            newsletterPage.clickNewLetter();
        })

        context("When I create newsletter with description longer than 2001 characters", () => {
            beforeEach(() => {
                let name = faker.word.adjective(4);
                let description = faker.lorem.sentence(2002);
                newsletterPage.fillTagById('#newsletter-title', name)
                newsletterPage.fillTagById('#newsletter-description', description)
                newsletterPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry button'", () => {
                newsletterPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})


describe("EP046 Crear newsletter con nombre y descripcion mayor a 191 y 2001 caracteres respectivamente - Aleatorio", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            cy.viewport(550, 750);
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            newsletterPage.visit()
            cy.wait(1000)
            newsletterPage.clickNewLetter();
        })

        context("When I create newsletter with name and description longer than 191 characteres", () => {
            beforeEach(() => {
                let name = faker.lorem.sentence(192);
                let description = faker.lorem.sentence(2002);
                newsletterPage.fillTagById('#newsletter-title', name);
                newsletterPage.fillTagById('#newsletter-description', description);
                newsletterPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry' and 'Cannot be longer than 191 characters'", () => {
                newsletterPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
                newsletterPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})