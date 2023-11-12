import User from "../pages/user"
import Login from "../pages/login"


const login = new Login()
const userPage = new User()

describe("scenery #1 create user", () => {
    context('Given I go to users page', () => {
        var cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            userPage.visit()
        })

        context("When I click on New member button", () => {
            beforeEach(() => {
                userPage.clickNewMember()
                cy.wait(1000)
            })
            it("Then I should see a new member page", () => {
                userPage.getEstatusTittleMember().should("contain.text", "New member")
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
            })

        })

    })
})


describe("scenery #2 edit user", () => {
    context('Given I go to users page', () => {
        var cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            userPage.visit()
        })

        context("When I select a user", () => {
            beforeEach(() => {
                userPage.clickSelectUser()
                cy.wait(1000)
            })
            it("Then I should see a edit member page", () => {
                userPage.getEstatusTittleMember().should("contain.text", "Edit member")
            })
        })


        context("When I change user name ", () => {
            let memberName = faker.animal.bear();
            beforeEach(() => {
                selectUserAndChangeName(memberName)
            })
            it("Then I should see the new member name", () => {
                userPage.getMemberName().should('have.value', memberName)
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