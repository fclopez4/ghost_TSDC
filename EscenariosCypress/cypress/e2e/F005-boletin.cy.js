import BoletinPage from "../pages/boletin"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const boletinPage = new BoletinPage()

describe("scenery #1 create newsletter ", () => {
    context('Given I go to newsletter page', () => {
        var cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            boletinPage.visit()
        })

        context("When I click on Newletter button", () => {
            beforeEach(() => {
                boletinPage.clickNewLetter()
                cy.wait(3000)
            })
            it("Then I should see modal content", () => {
                boletinPage.getModalContent().should('exist');
            })
        })

        context("When I fill name and description", () => {
            let name = faker.animal.bear();
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                fillData(name, description)
                cy.wait(3000)
            })
            it("Then I should see modal content", () => {
                boletinPage.getModalContent().should('exist');
            })
        })

        context("When I click on Create button", () => {
            let name = faker.animal.bear();
            let description = faker.lorem.paragraph(1);
            let size = 0;
            beforeEach(() => {
                cy.get('.sortable-objects')
                    .find('div.draggable-object')
                    .should(($divs) => {
                        size = $divs.length;
                    });
                create(name, description)
            })
            it("Then I should add a new element  to the card", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

    })
})

function fillData(name, description) {
    boletinPage.clickNewLetter()
    cy.wait(1000)
    boletinPage.fillTagById('#newsletter-title',name)
    boletinPage.fillTagById('#newsletter-description',description)
}

function editFillData(name, description) {
    boletinPage.fillTagById('#newsletter-title',name)
    boletinPage.fillTagById('#newsletter-description',description)
}

function create(name, description) {
    fillData(name, description)
    cy.wait(2000)
    boletinPage.clickCreate()
    cy.wait(2000)
}