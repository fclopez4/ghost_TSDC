import { faker } from '@faker-js/faker';
import Login from "../pages/login"
import Tags from "../pages/tags"

const login = new Login()
const tags = new Tags()

describe('EP010 create tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;

        before(() => {
            login.insertLogin()
            cy.wait(3000)
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            cy.wait(1000)
            tags.clickButtonNewTag()
            cy.wait(1000)
        })

        context('When I click on save button without fill tag form fields', () => {
            beforeEach(() => {
                tags.clickButtonSaveTag()
                cy.wait(1000)
            })

            it('Then I should be see a message about empty name', () => {
                tags.getTagMessageError().should("contain.text", "You must specify a name for the tag.")
            })
        })

        context('When I click on tag breadcrum', () => {
            beforeEach(() => {
                tags.clickBreadcrumbTag()
                cy.wait(1000)
            })

            it('Then I should be see a modal message', () => {
                tags.getTagModalHeader().should("contain.text", "Are you sure you want to leave this page?")
            })
        })

        context('When I fill tag form fields and click on save button', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                tags.clickButtonSaveTag()
                cy.wait(1000)
            })

            it('Then I should be see the tag name like a title', () => {
                tags.getTagTitle().should("contain.text", tagName)
            })
        })

        context('When I fill tag form fields and click on leave button from breadcrum', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                tags.clickBreadcrumbTag()
                tags.clickButtonFooterModalLeaveTagForm()
                cy.wait(1000)
            })

            it('Then I should be return to tag list', () => {
                tags.getTagTitle().should("contain.text", "Tags")
            })

            it('And not see the tag name in tag list', () => {
                tags.getTagListTitle().contains(tagName).should('not.exist');
            })
        })
    })

});

describe('EP011 edit tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;

        before(() => {
            login.insertLogin()
            cy.wait(3000)
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            cy.wait(1000)
            tags.clickButtonNewTag()
            cy.wait(1000)
        })

        context('When I click on save button after change tag name and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(faker.lorem.slug())
                tags.clickButtonSaveTag()
                tags.cleanFillTagNameInput(tagName)
                tags.clickButtonSaveTag()
                tags.clickBreadcrumbTag()
                cy.wait(1000)
            })

            it('Then I should be see the new tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('exist');
            })
        })

        context('When I click on leave button after change tag name without save and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(faker.lorem.slug())
                tags.clickButtonSaveTag()
                tags.cleanFillTagNameInput(tagName)
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                tags.clickButtonFooterModalLeaveTagForm()
                cy.wait(1000)
            })

            it('Then I should not be see that new tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('not.exist');
            })
        })
    })

});

export function fillDummyDataFormTag(tagName) {
    tags.fillTagNameInput(tagName)
    tags.fillTagColorInput(faker.color.rgb({ prefix: '', casing: 'upper' }))
    tags.fillTagDescription(faker.lorem.sentences())
}