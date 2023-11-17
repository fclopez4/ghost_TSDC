import User from "../pages/user"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const userPage = new User()

describe("EP014 create user", () => {
    context('Given I go to users page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            userPage.visit()
        })

        context("When I click on New member button", () => {
            beforeEach(() => {
                userPage.clickNewMember()
                cy.wait(1000)
            })
            it("Then I should see a new member page", () => {
                userPage.getEstatusTittleMember().should("contain.text", "New member")
                login.tomarPantallazo("F004-EP014", "1")
            })
        })

		context("When I fill the member name, email, label and note", () => {
			const memberName =  faker.animal.bear();
            const memberEmail = faker.word.adjective(4) + '@algo.com';
            const memberLabel = faker.word.adjective(4);
            const memberNota = faker.lorem.paragraph(1);
            beforeEach(() => {
                fillData(memberName, memberEmail, memberLabel, memberNota)
            })

            it("Then I should see the name, email, label and note filled", () => {
                userPage.getMemberName().should('have.value', memberName)
                userPage.geMemberEmail().should('have.value', memberEmail);
                userPage.getMemberLabel().should('have.value', memberLabel);
                userPage.getMemberNote().should('have.value', memberNota);
                login.tomarPantallazo("F004-EP014", "2")
            })
        })

        context('When I fill the data and click on new member button', () => {
            let memberName = faker.animal.bear();
            let memberEmail = faker.word.adjective(4) + '@algo.com';
            let memberLabel = faker.word.adjective(4);
            let memberNota = faker.lorem.paragraph(3);
            beforeEach(() => {
                fillData(memberName, memberEmail, memberLabel, memberNota)
                userPage.clickSaveMember()
            })
            it("Then I should see the detail user", () => {
                userPage.getTitle().should('contain.text', memberName);
                login.tomarPantallazo("F004-EP014", "3")
            })

        })

    })
})


describe("EP015 edit user", () => {
    context('Given I go to users page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            userPage.visit()
        })

        context("When I select a user", () => {
            beforeEach(() => {
                userPage.clickSelectUser()
                cy.wait(1000)
            })
            it("Then I should see a edit member page", () => {
                userPage.getEstatusTittleMember().should("contain.text", "Edit member")
                login.tomarPantallazo("F004-EP015", "1")
            })
        })


        context("When I change user name ", () => {
            let memberName = faker.animal.bear();
            beforeEach(() => {
                selectUserAndChangeName(memberName)
            })
            it("Then I should see the new member name", () => {
                userPage.getMemberName().should('have.value', memberName)
                login.tomarPantallazo("F004-EP015", "2")
            })
        })

        context("When I change user name and click on save button", () => {
            let memberName = faker.animal.bear();
            beforeEach(() => {
                selectUserAndChangeName(memberName)
                userPage.clickSaveMember()
            })
            it("Then I should see the save button with teh class gh-btn-green", () => {
                userPage.getButtonSave().should('have.class', 'gh-btn-green')
                login.tomarPantallazo("F004-EP015", "3")
            })
        })

    })
})


describe("EP016 delete user", () => {
    context('Given I go to users page', () => {
        let cookieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            userPage.visit()
        })

        context("When I select a user", () => {
            beforeEach(() => {
                userPage.clickSelectUser()
                cy.wait(1000)
            })
            it("Then I should see a edit member page", () => {
                userPage.getEstatusTittleMember().should("contain.text", "Edit member")
                login.tomarPantallazo("F004-EP016", "1")
            })
        })

        context("When I click on setting button ", () => {
            beforeEach(() => {
                userPage.clickSelectUser()
                cy.wait(1000)
                userPage.clickSettingButton()
            })
            it("Then I should see the delete menu", () => {
                userPage.getDeleteMenu().should('exist');
                login.tomarPantallazo("F004-EP016", "2")
            })
        })

        context("When I click on delete button ", () => {
            beforeEach(() => {
                clickOnDeleteButton()
            })
            it("Then I should see the confirmation pop-up", () => {
                userPage.getConfirmationPopUp().should('exist');
                login.tomarPantallazo("F004-EP016", "3")
            })
        })


        context("When I click on confirm delete user ", () => {
            beforeEach(() => {
                clickOnDeleteButton()
                userPage.clickConfirmationPopUp()
                cy.wait(3000)
            })
            it("Then I should see the Members page", () => {
                userPage.getTitle().should('contain.text', 'Members');
                login.tomarPantallazo("F004-EP016", "4")
            })
        })
    })
})

function clickOnDeleteButton(){
    userPage.clickSelectUser()
    cy.wait(1000)
    userPage.clickSettingButton()
    cy.wait(1000)
    userPage.clickDeleteButton()
}
function fillData(memberName, memberEmail, memberLabel, memberNota) {
    userPage.clickNewMember()
    cy.wait(1000)
    userPage.fillTagById('#member-name',memberName)
    userPage.fillTagById('#member-email',memberEmail)
    userPage.fillTagById('.ember-power-select-trigger-multiple-input', memberLabel)
    userPage.fillTagById('#member-note', memberNota)
}

function selectUserAndChangeName(memberName) {
    userPage.clickSelectUser()
    cy.wait(1000)
    userPage.clearTagById('#member-name')
    userPage.fillTagById('#member-name',memberName)
    userPage.clickOutOfForm()
    cy.wait(1000)
}