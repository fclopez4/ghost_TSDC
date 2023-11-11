import { faker } from '@faker-js/faker';
import Login from "../pages/login"
import Tags from "../pages/tags"

const login = new Login()
const tags = new Tags()

describe('scenario #10 create tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;

        before(() => {
            login.visit()
            login.setInputUsername(Cypress.env('usuario'))
            login.setInputPassword(Cypress.env('password'))
            login.getSubmitButton().click()
            cy.wait(3000)
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            cy.wait(1000)
            tags.getButtonNewTag().click()
            cy.wait(1000)
        })

        context('When I click on save button without fill tag form fields', () => {
            beforeEach(() => {             
                tags.getButtonSaveTag().click()
                cy.wait(1000)
            })

            it('Then I should be see a message about empty name', () => {
                tags.getTagMessageError().should("contain.text", "You must specify a name for the tag.")
            })
        })

        context('When I click on tag breadcrum', () => {
            beforeEach(() => {
                tags.getTagBreadcrumb().click()
                cy.wait(1000)
            })
            it('Then I should be see a modal message', () => {
                tags.getTagModalHeader().should("contain.text", "Are you sure you want to leave this page?")
            })
        })

        context('When I fill tag form fields and click on save button', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                tags.getTagNameInput().type(tagName)
                tags.getTagColorInput().type(faker.color.rgb({ prefix: '', casing: 'upper' }))
                tags.getTagDescription().type(faker.lorem.sentences())
                tags.getButtonSaveTag().click()
                cy.wait(1000)
            })
            it('Then I should be see the tag name like a title', () => {
                tags.getTagTitle().should("contain.text", tagName)
            })
        })

        context('When I fill tag form fields and click on leave button from breadcrum',()=>{
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                tags.getTagNameInput().type(tagName)
                tags.getTagColorInput().type(faker.color.rgb({ prefix: '', casing: 'upper' }))
                tags.getTagDescription().type(faker.lorem.sentences())
                tags.getTagBreadcrumb().click()
                tags.getTagFooterModalLeaveButton().click()
                cy.wait(1000)
            })

            it('Then I should be return to tag list and not see the tag name in tag list',()=>{
                tags.getTagTitle().should("contain.text", "Tags")
                tags.getTagListTitle().contains(tagName).should('not.exist');
            })
        })
    })

});

describe('scenario #11 edit tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;

        before(() => {
            login.visit()
            login.setInputUsername(Cypress.env('usuario'))
            login.setInputPassword(Cypress.env('password'))
            login.getSubmitButton().click()
            cy.wait(3000)
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            cy.wait(1000)
            tags.getButtonNewTag().click()
            cy.wait(1000)
        })

        context('When I click on save button after change tag name and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {             
                createDummyTag(faker.lorem.slug())
                tags.getTagNameInput().clear().type(tagName)
                tags.getButtonSaveTag().click()
                tags.getTagBreadcrumb().click()
                cy.wait(1000)
            })

            it('Then I should be see the new tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('exist');
            })
        })

        context('When I click on leave button after change tag name without save and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                createDummyTag(faker.lorem.slug())
                tags.getTagNameInput().clear().type(tagName)
                tags.getTagBreadcrumb().click()
                tags.getTagFooterModalLeaveButton().click()
                cy.wait(1000)
            })
            it('Then I should not be see that new tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('not.exist');
            })
        })
    })

});

export function createDummyTag(tagName) {
    tags.getTagNameInput().type(tagName)
    tags.getTagColorInput().type(faker.color.rgb({ prefix: '', casing: 'upper' }))
    tags.getTagDescription().type(faker.lorem.sentences())
    tags.getButtonSaveTag().click()
}