import { faker } from '@faker-js/faker';
import Login from "../pages/login"
import Tags from "../pages/tags"

const login = new Login()
const tags = new Tags()

describe('EP010 create tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;
        let indicator = 'F003-EP010';

        before(() => {
            login.insertLogin()            
            cy.wait(3000)
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            login.tomarPantallazo(indicator,'02')
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator,'03')
        })

        context('When I click on save button without fill tag form fields', () => {
            beforeEach(() => {
                tags.clickButtonSaveTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'04')
            })

            it('Then I should be see a message about empty name', () => {
                tags.getTagMessageError().should("contain.text", "You must specify a name for the tag.")
            })
        })

        context('When I click on tag breadcrum', () => {
            beforeEach(() => {
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'05')
            })

            it('Then I should be see a modal message', () => {
                tags.getTagTitle().should("contain.text", "Tags")
            })
        })

        context('When I fill tag form fields and click on save button', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                login.tomarPantallazo(indicator,'06')
                tags.clickButtonSaveTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'07')
            })

            it('Then I should be see the tag name like a title', () => {
                tags.getTagTitle().should("contain.text", tagName)
            })
        })

        context('When I fill tag form fields and click on leave button from breadcrum', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                login.tomarPantallazo(indicator,'08')
                tags.clickBreadcrumbTag()
                login.tomarPantallazo(indicator,'09')
                tags.clickButtonFooterModalLeaveTagForm()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'10')
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
        let indicator = 'F003-EP011';

        before(() => {
            login.insertLogin()
            cy.wait(3000)
            login.tomarPantallazo(indicator,'01')
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            tags.visit()
            login.tomarPantallazo(indicator,'02')
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator,'03')
        })

        context('When I click on save button after change tag name and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(faker.lorem.slug())
                login.tomarPantallazo(indicator,'04')
                tags.clickButtonSaveTag()
                login.tomarPantallazo(indicator,'05')
                tags.cleanFillTagNameInput(tagName)
                login.tomarPantallazo(indicator,'06')
                tags.clickButtonSaveTag()
                login.tomarPantallazo(indicator,'07')
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'08')
            })

            it('Then I should be see the new tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('exist');
            })
        })

        context('When I click on leave button after change tag name without save and return to tag list', () => {
            let tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(faker.lorem.slug())
                login.tomarPantallazo(indicator,'09')
                tags.clickButtonSaveTag()
                login.tomarPantallazo(indicator,'10')
                tags.cleanFillTagNameInput(tagName)
                login.tomarPantallazo(indicator,'11')
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'12')
                tags.clickButtonFooterModalLeaveTagForm()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'13')
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