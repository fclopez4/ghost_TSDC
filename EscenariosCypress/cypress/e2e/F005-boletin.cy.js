import BoletinPage from "../pages/boletin"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const boletinPage = new BoletinPage()

describe("EP017 create newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
        })

        context("When I click on Newletter button", () => {
            beforeEach(() => {
                boletinPage.clickNewLetter()
                cy.wait(3000)
            })
            it("Then I should see modal content", () => {
                boletinPage.getModalContent().should('exist');
                login.tomarPantallazo("F005-EP017", "1")
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
                login.tomarPantallazo("F005-EP017", "2")
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
                login.tomarPantallazo("F005-EP017", "3")
            })
        })

    })
})

describe("EP018 edit newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
        })

        context("When I select a Newsletter from de list", () => {
            beforeEach(() => {
                boletinPage.selectNewsLetter()
                cy.wait(3000)
            })
            it("Then I should see modal content", () => {
                boletinPage.getTitleEdit().should('contain.text', 'Edit newsletter');
                login.tomarPantallazo("F005-EP018", "1")
            })
        })

        context("When I change name and description data", () => {
            let name = faker.animal.bear();
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                boletinPage.selectNewsLetter()
                editFillData(name, description)
                cy.wait(2000)
            })
            it("Then I should see the name typed on the body", () => {
                boletinPage.getTextBody().should('contain.text', name);
                login.tomarPantallazo("F005-EP018", "2")
            })
        })


        context("When I click on Save and close button", () => {
            let name = faker.animal.bear();
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                boletinPage.selectNewsLetter()
                editFillData(name, description)
                cy.wait(2000)
                boletinPage.clickSaveAndClose()
                cy.wait(2000)
            })
            it("Then I should see Email newsletter page", () => {
                boletinPage.getTitle().should('contain.text', 'Email newsletter');
                login.tomarPantallazo("F005-EP018", "3")
            })
        })


    })
})

describe("EP019 archive newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
        })

        context("When I select options newsletter", () => {
            beforeEach(() => {
                cy.wait(2000)
                boletinPage.selectSelectOptions()
                cy.wait(3000)
            })
            it("Then I should see menu options", () => {
                boletinPage.getMenuArchive().should('exist');
                login.tomarPantallazo("F005-EP019", "1")
            })
        })

        context("When I select a archive option", () => {
            beforeEach(() => {
                cy.wait(2000)
                boletinPage.selectSelectOptions()
                cy.wait(2000)
                boletinPage.clickOnArchive()
            })
            it("Then I should see the modal confirm", () => {
                boletinPage.getTitleModalConfirm().should('contain.text', 'Archive newsletter');
                login.tomarPantallazo("F005-EP019", "2")
            })
        })

        context("When I click on Archive confirm", () => {
            beforeEach(() => {
                cy.wait(2000)
                boletinPage.selectSelectOptions()
                cy.wait(2000)
                boletinPage.clickOnArchive()
                cy.wait(2000)
                boletinPage.clickOnArchiveConfirm()
            })
            it("Then I should see Email newsletter page", () => {
                boletinPage.getTitle().should('contain.text', 'Email newsletter');
                login.tomarPantallazo("F005-EP019", "3")
            })
        })
    })
})

describe("EP020 list newsletter ", () => {
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
        })

        context("When I list Email newsletter", () => {
            let size = 0;
            beforeEach(() => {
                cy.get('.sortable-objects')
                    .find('div.draggable-object')
                    .should(($divs) => {
                        size = $divs.length;
                    });
            })
            it("Then I should see more than one newsletter", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length.greaterThan', 0);
                login.tomarPantallazo("F005-EP019", "4")
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