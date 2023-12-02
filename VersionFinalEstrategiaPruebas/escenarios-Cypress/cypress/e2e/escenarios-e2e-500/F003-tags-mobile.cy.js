import { faker } from '@faker-js/faker';
import Login from "../../pages/version-500/login"
import Tags from "../../pages/version-500/tags"

const login = new Login()
const tags = new Tags()

Cypress.Commands.add('given', (description, callback) => {
    cy.log(`GIVEN: ${description}`)
    callback()
})

Cypress.Commands.add('ands', (description, callback) => {
    cy.log(`AND: ${description}`)
    callback()
})

Cypress.Commands.add('when', (description, callback) => {
    cy.log(`WHEN: ${description}`)
    callback()
})

Cypress.Commands.add('then2', (description, callback) => {
    cy.log(`THEN: ${description}`)
    callback()
})

describe('EP010 create tag', () => {
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
    })

    it('should not create a empty tag', () => {

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I click on save button without fill tag form fields', () => {
            tags.clickButtonSaveTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '04')
        })

        cy.then2('I should be see a message about empty name', () => {
            tags.getTagMessageError().should("contain.text", "You must specify a name for the tag.")
        })
    })

    it('should show message modal', () => {

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I click on tag breadcrum', () => {
            tags.clickBreadcrumbTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '05')
        })

        cy.then2('I should be see a tag list title', () => {
            tags.getTagTitle().should("contain.text", "Tags")
        })
    })

    it('should show the new tag in the tag list', () => {
        let tagName = faker.lorem.slug()
        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I fill tag form fields and click on save button', () => {
            fillDummyDataFormTag(tagName)
            login.tomarPantallazo(indicator, '06')
        })

        cy.ands('I clic on save button', () => {
            tags.clickButtonSaveTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '07')
        })

        cy.then2('I should be see the tag name like a title', () => {
            tags.getTagTitle().should("contain.text", tagName)
        })
    })

    it('should not show a tag without click on save button', () => {
        let tagName = faker.lorem.slug()
        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I fill tag form fields', () => {
            fillDummyDataFormTag(tagName)
            login.tomarPantallazo(indicator, '08')
        })

        cy.ands('I click on tag breadcrum', () => {
            tags.clickBreadcrumbTag()
            login.tomarPantallazo(indicator, '09')
        })

        cy.ands('I click on leave button from modal', () => {
            tags.clickButtonFooterModalLeaveTagForm()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '10')
        })

        cy.then2('I should be return to tag list', () => {
            tags.getTagTitle().should("contain.text", "Tags")
        })

        cy.ands('I should not see the tag name in tag list', () => {
            tags.getTagListTitle().contains(tagName).should('not.exist');
        })
    })
});



describe('EP011 edit tag', () => {
    let cookieValue;
    let indicator = 'F003-EP011';

    before(() => {
        login.insertLogin()
        cy.wait(2000)
        login.tomarPantallazo(indicator,'01')
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
        login.tomarPantallazo(indicator,'02')
    })

    it('should update a tag name', () => {
        let tagName = faker.lorem.slug()
        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I create a new tag', () => {
            fillDummyDataFormTag(faker.lorem.slug())
            login.tomarPantallazo(indicator, '04')
            tags.clickButtonSaveTag()
            login.tomarPantallazo(indicator, '05')
        })

        cy.ands('I change tag title', () => {
            tags.cleanFillTagNameInput(tagName)
            login.tomarPantallazo(indicator,'06')
        })

        cy.ands('I save changes', () => {
            tags.clickButtonSaveTag()
            login.tomarPantallazo(indicator,'07')
        })

        cy.ands('I return to tag list', () => {
            tags.clickBreadcrumbTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator,'08')
        })

        cy.then2('I should be see the new tag name on the tag list', () => {
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should not update a tag name', () => {
        let tagName = faker.lorem.slug()
        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
            cy.wait(1000)
            login.tomarPantallazo(indicator, '03')
        })

        cy.when('I create a new tag', () => {
            fillDummyDataFormTag(faker.lorem.slug())
            login.tomarPantallazo(indicator,'09')
            tags.clickButtonSaveTag()
            login.tomarPantallazo(indicator,'10')
        })

        cy.ands('I change tag title', () => {
            tags.cleanFillTagNameInput(tagName)
            login.tomarPantallazo(indicator,'11')
        })

        cy.ands('I click on tag breadcrum', () => {
            tags.clickBreadcrumbTag()
            login.tomarPantallazo(indicator,'12')
        })

        cy.ands('I click on leave button from modal', () => {
            tags.clickButtonFooterModalLeaveTagForm()
            cy.wait(1000)
            login.tomarPantallazo(indicator,'13')
        })

        cy.then2('I should not be see that new tag name on the tag list', () => {
            tags.getTagListTitle().contains(tagName).should('not.exist');
        })
    })

});
export function fillDummyDataFormTag(tagName) {
    tags.fillTagNameInput(tagName)
    tags.fillTagColorInput(faker.color.rgb({ prefix: '', casing: 'upper' }))
    tags.fillTagDescription(faker.lorem.sentences())
}