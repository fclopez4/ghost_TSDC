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
            it("Then I should see modal content to create the Newsletter", () => {
                boletinPage.getModalContent().should('contain.text', 'Create newsletter');
                login.tomarPantallazo("F004-EP017", "1")
            })
        })

        context("When I fill name and description", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                fillData(name, description)
                cy.wait(3000)
            })
            it("Then I should see the name on the input text", () => {
                cy.get('input[placeholder="Weekly roundup"]').invoke('val').should('not.be.empty');
                login.tomarPantallazo("F004-EP017", "2")
            })
        })


        context("When I click on Create button", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            let size = 0;
            beforeEach(() => {
                size = cy.get('table tr').its('length').as('rowCount');
                create(name, description)
            })
            it("Then I should see the preview newsletter", () => {
                cy.get('img[alt="Feature"]').should('exist');
                login.tomarPantallazo("F004-EP017", "2")
            })
        })

        context("When I click on Save button", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            let size = 0;
            beforeEach(() => {
                cy.get('table tbody tr').its('length').then((count) => {
                    size = count;
                });
                create(name, description)
                boletinPage.clickClose()
            })
            it("Then I should see the new newsletter in the table", () => {
                cy.get('table').find('tr').should('have.length', (size+1));
                login.tomarPantallazo("F004-EP017", "2")
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
                boletinPage.getBottonSave().should('exist');
                login.tomarPantallazo("F004-EP018", "2")
            })
        })


        context("When I change name and description data", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                boletinPage.selectNewsLetter()
                cy.wait(3000)
                editFillData(name, description)
                cy.wait(3000)
            })
            it("Then I should see the new name on the input text", () => {
                cy.get('input[placeholder="Weekly Roundup"]').invoke('val').should('not.be.empty');
                login.tomarPantallazo("F004-EP018", "3")
            })
        })

        context("When I click on Save and close button", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                boletinPage.selectNewsLetter()
                cy.wait(2000)
                editFillData(name, description)
                cy.wait(2000)
                boletinPage.clickOnButtonSave()
                cy.wait(2000)
                boletinPage.clickClose()
                cy.wait(2000)
            })
            it("Then I should see Email newsletter page", () => {
                boletinPage.getNewsLetterButton().should('exist');
                login.tomarPantallazo("F004-EP018", "4")
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

        context("When I select Archive newsletter option", () => {
            beforeEach(() => {
                cy.wait(2000)
                boletinPage.selectNewsLetter()
                cy.get('h5').contains('Email addresses').scrollIntoView();
                cy.get('h5').contains('Member settings').scrollIntoView();
                cy.wait(3000)
                boletinPage.selectSelectArchiveOption()
                cy.wait(3000)
            })
            it("Then I should see the modal confirmation", () => {
               boletinPage.getModalArchive().should('exist');
                login.tomarPantallazo("F005-EP019", "1")
            })
        })

        context("When I confirm a archive option", () => {
            let name = faker.word.adjective(4);
            let description = faker.lorem.paragraph(1);
            beforeEach(() => {
                create(name, description)
                boletinPage.clickClose()
                cy.wait(3000)
                selectArchiveOption();
                boletinPage.selectConfirmArchive()
                cy.wait(3000)
            })
            it("Then I should see archived confimration", () => {
                boletinPage.getConfirmationArchivedMessage().should('exist');
                login.tomarPantallazo("F005-EP019", "2")
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

    context("When I list Newsletter", () => {
        let name = faker.word.adjective(4);
        let description = faker.lorem.paragraph(1);
        beforeEach(() => {
            create(name, description)
            boletinPage.clickClose()
            cy.wait(3000)
                    })
        it("Then I should see more than one newsletter", () => {
            cy.get('table').find('tr').should('have.length.greaterThan', 0);
            login.tomarPantallazo("F005-EP020", "1")
        })
    })

    })
})

function fillData(name, description) {
    boletinPage.clickNewLetter()
    cy.wait(1000)
    boletinPage.fillTagById('input[placeholder="Weekly roundup"]',name)
    boletinPage.fillTagById('textarea',description)
}

function editFillData(name, description) {
    boletinPage.fillTagById('input[placeholder="Weekly Roundup"]',name)
    boletinPage.fillTagById('textarea',description)
}

function create(name, description) {
    fillData(name, description)
    cy.wait(2000)
    boletinPage.clickCreate()
    cy.wait(2000)
    //boletinPage.clickSave()
    cy.wait(2000)
}
function selectArchiveOption() {
    cy.wait(2000)
    boletinPage.selectNewsLetter()
    cy.get('h5').contains('Email addresses').scrollIntoView();
    cy.get('h5').contains('Member settings').scrollIntoView();
    cy.wait(3000)
    boletinPage.selectSelectArchiveOption()
    cy.wait(3000)
}