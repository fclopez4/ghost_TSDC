import User from "../pages/user"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const userPage = new User()

describe("EP014 create member - ALEATORIO", () => {
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

        context("When I create a new member with a name longer than 191 characters", () => {
            beforeEach(() => {
                let memberName = faker.lorem.paragraph(10);
                let memberEmail = faker.word.adjective(4) + '@algo.com';
                userPage.clickNewMember()
                userPage.fillTagById('#member-name',memberName);
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message 'Name cannot be longer than 191 characters.'", () => {
                userPage.getRespose().should("contain.text", "Name cannot be longer")
            })
        })

        context("When I create a new member without email.", () => {
            beforeEach(() => {
                userPage.clickNewMember()
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message 'Please enter an email'", () => {
                userPage.getRespose().should("contain.text", "Please enter an email")
            })
        })

        context("When I create a new member with incorrect email.", () => {
            beforeEach(() => {
                let memberEmail = faker.word.adjective(4);
                userPage.clickNewMember()
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
            })
            it("Then I should see the message 'Member already exists.'", () => {
                userPage.getRespose().should("contain.text", "Invalid Email.")
            })
        })

        context("When I create a new member with existing email.", () => {
            beforeEach(() => {
                let memberEmail = faker.word.adjective(5)+ '@algo.com';
                userPage.clickNewMember()
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.wait(3000);
                userPage.visit()
                cy.wait(3000);
                userPage.clickNewMember()
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(2000);
            })
            it("Then I should see the message 'Member already exists.'", () => {
                userPage.getRespose().should("contain.text", "Member already exists.")
            })
        })

        context("When I create a new member with a note longer than 500 characters", () => {
            beforeEach(() => {
                const memberName = faker.word.adjective(4);
                const memberEmail = faker.word.adjective(4) + '@algo.com';
                const memberNota = faker.lorem.paragraph(20);
                userPage.clickNewMember()
                userPage.fillTagById('#member-name',memberName);
                userPage.fillTagById('#member-email',memberEmail)
                userPage.fillTagById('#member-note', memberNota)
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message  'Note is too long'", () => {
                userPage.getRespose().should("contain.text", "Note is too long.")
            })
        })
    })
})

describe("EP014 edit member ALEATORIO", () => {
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
            userPage.clickSelectUser()
            cy.wait(1000)
        })

        context("When I edit a member with a name longer than 191 characters", () => {
            beforeEach(() => {
                let memberName = faker.lorem.paragraph(10);
                let memberEmail = faker.word.adjective(4) + '@algo.com';
                userPage.clearTagById('#member-name');
                userPage.clearTagById('#member-email');
                userPage.fillTagById('#member-name',memberName);
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message 'Name cannot be longer than 191 characters.'", () => {
                userPage.getRespose().should("contain.text", "Name cannot be longer")
            })
        })

        context("When I edit a member without email.", () => {
            beforeEach(() => {
                userPage.clearTagById('#member-email');
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message 'Please enter an email'", () => {
                userPage.getRespose().should("contain.text", "Please enter an email")
            })
        })

        context("When I edit a member with incorrect  email.", () => {
            beforeEach(() => {
                let memberEmail = faker.word.adjective(4);
                userPage.clearTagById('#member-email');
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
            })
            it("Then I should see the message 'Member already exists.'", () => {
                userPage.getRespose().should("contain.text", "Invalid Email.")
            })
        })

        context("When I edit a member with existing email.", () => {
            beforeEach(() => {
                userPage.visit();
                cy.wait(2000);
                let memberEmail = faker.word.adjective(4)+ '@algo.com';
                userPage.clickNewMember()
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.wait(3000);
                userPage.visit()
                cy.wait(3000);
                userPage.clickSelectUserByRow(2);
                userPage.clearTagById('#member-email');
                userPage.fillTagById('#member-email',memberEmail)
                userPage.clickSaveMember();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(2000);
            })
            it("Then I should see the message 'Member already exists.'", () => {
                userPage.getRespose().should("contain.text", "Member already exists.")
            })
        })

        context("When I edit member with a note longer than 500 characters", () => {
            beforeEach(() => {
                const memberNota = faker.lorem.paragraph(20);
                userPage.clearTagById('#member-note');
                userPage.fillTagById('#member-note', memberNota)
                userPage.clickSaveMember();
                cy.wait(3000);
            })
            it("Then I should see the message 'Note is too long'", () => {
                userPage.getRespose().should("contain.text", "Note is too long.")
            })
        })
    })
})