import { faker } from '@faker-js/faker';
import Login from "../pages/login"
import Tags from "../pages/tags"

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


describe('Fill tag title and description - ALEATORIO', () => {
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag with max characters -1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill and submit the form', () => {
            tagName = faker.string.alphanumeric(190)
            tags.fillTagNameInput(tagName)
            tags.fillTagDescription(faker.string.alphanumeric(499))
            tags.clickButtonSaveTag()
            tags.visit()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagListTitle().contains(tagName).should('exist');
        })

    });

    it('should create a tag with max characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill and submit the form', () => {
            tagName = faker.string.alphanumeric(191)
            tags.fillTagNameInput(tagName)
            tags.fillTagDescription(faker.string.alphanumeric(500))
            tags.clickButtonSaveTag()
            tags.visit()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagListTitle().contains(tagName).should('exist');
        })

    });

    it('should create a tag with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill and submit the form', () => {
            tagName = faker.string.alphanumeric(192)
            tags.fillTagNameInput(tagName)
            tags.fillTagDescription(faker.string.alphanumeric(501))
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag error message', () => {
            tags.getTagDescriptionError().should('contain', "Description cannot be longer than 500 characters.")
            tags.getTagNameError().should('contain', "Tag names cannot be longer than 191 characters.")
        })
    });

})

describe('Fill google metadata tag - ALEATORIO', () => {
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag with google metadata with max characters -1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(faker.string.alphanumeric(299))
            tags.fillTagMetadataDescription(faker.string.alphanumeric(499))
            tags.fillTagMetadataUrl(faker.internet.url())
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag with google metadata with max characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(faker.string.alphanumeric(300))
            tags.fillTagMetadataDescription(faker.string.alphanumeric(500))
            tags.fillTagMetadataUrl(faker.image.url())
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })

    })

    /*por reportar el input url no valida la maxima cantidad de 2000 caracteres */
    it('should create a tag with google metadata with max characters + 1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(faker.string.alphanumeric(301))
            tags.fillTagMetadataDescription(faker.string.alphanumeric(501))
            tags.fillTagMetadataUrl(faker.image.url({ appendSlash: true }) + faker.string.alphanumeric(1999))
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the metadata error', () => {
            tags.getTagMetadataTitleError().should('contain', "Meta Title cannot be longer than 300 characters.")
            tags.getTagMetadataDescriptionError().should('contain', "Meta Description cannot be longer than 500 characters.")
        })

    })
})

describe('Fill X card tag - ALEATORIO', () => {
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag and X card with max characters -1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(faker.string.alphanumeric(299))
            tags.fillTagXcardDescription(faker.string.alphanumeric(499))
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and X card with max characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(faker.string.alphanumeric(300))
            tags.fillTagXcardDescription(faker.string.alphanumeric(500))
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    /*Por reportar, el input descripcion no valida la maxima cantidad de 500 caracteres */
    it('should create a tag and X card with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = faker.string.alphanumeric(6)
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(faker.string.alphanumeric(301))
            tags.fillTagXcardDescription(faker.string.alphanumeric(501))
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagXcardError().should('exist')
            tags.getTagXcardError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('Fill facebook card - ALEATORIO', () =>{
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag and facebook card with max characters -1', () => {

    })

    it('should create a tag and facebook card with max characters', () => {
        
    })

    it('should create a tag and facebook card with max characters +1', () => {
        
    })
})

describe('Fill Code injection - ALEATORIO', () =>{
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag with Code injection and max characters -1', () => {

    })

    it('should create a tag with Code injection and max characters', () => {
        
    })

    it('should create a tag with Code injection and max characters +1', () => {
        
    })
})

/*

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
                tags.getTagModalHeader().should("contain.text", "Are you sure you want to leave this page?")
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

describe('EP012 delete tag', () => {
    context('Given I go to tags page', () => {
        let cookieValue;
        let indicator = 'F003-EP012';

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

        context('When I click on delete button and I click on modal cancel button and return to tag list', () => {
            const tagName = faker.lorem.slug()
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                login.tomarPantallazo(indicator,'04')
                tags.clickButtonSaveTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'05')
                tags.clickButtonDeleteTag()
                login.tomarPantallazo(indicator,'06')
                tags.clickButtonModalCancelTag()
                login.tomarPantallazo(indicator,'07')
                tags.clickBreadcrumbTag()
                login.tomarPantallazo(indicator,'08')
            })

            it('Then I should be see that tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('exist');
            })

        })

        context('When I click on delete button and I click on modal delete button', () => {
            const tagName = faker.lorem.slug()
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false
            })
            beforeEach(() => {
                fillDummyDataFormTag(tagName)
                login.tomarPantallazo(indicator,'09')
                tags.clickButtonSaveTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'10')
                tags.clickButtonDeleteTag()
                login.tomarPantallazo(indicator,'11')
                tags.clickTagModalDeleteButton()
                login.tomarPantallazo(indicator,'12')
            })

            it('Then I should not be see that tag name on the tag list', () => {
                tags.getTagListTitle().contains(tagName).should('not.exist');
            })

        })

    })
});

describe('EP013 list tags', () => {
    context('Given I go to tags page', () => {
        let cookieValue;
        let indicator = 'F003-EP013';

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
        })

        context('When I go to the tag path and I click on new tag button and I leave form new tag', () => {
            beforeEach(() => {
                tags.visit()
                login.tomarPantallazo(indicator,'02')
                tags.clickButtonNewTag()
                login.tomarPantallazo(indicator,'03')
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'04')
                tags.clickButtonFooterModalLeaveTagForm()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'05')
            })

            it('Then I should be see the tag title list', () => {
                tags.getTagTitle().should("contain.text", "Tags")
            })

            it('And I should be see the button new tag', () => {
                tags.getButtonNewTag().should("exist")
            })

        })

        context('When I go to the tag path and create some tags and return to tag list', () => {
            beforeEach(() => {
                tags.visit()               
                login.tomarPantallazo(indicator,'06')
                tags.clickButtonNewTag()
                login.tomarPantallazo(indicator,'07')
                fillDummyDataFormTag(faker.lorem.slug())
                login.tomarPantallazo(indicator,'08')
                tags.clickButtonSaveTag()
                login.tomarPantallazo(indicator,'09')
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'10')
                tags.clickButtonNewTag()
                login.tomarPantallazo(indicator,'11')
                fillDummyDataFormTag(faker.lorem.slug())
                login.tomarPantallazo(indicator,'12')
                tags.clickButtonSaveTag()
                login.tomarPantallazo(indicator,'13')
                tags.clickBreadcrumbTag()
                cy.wait(1000)
                login.tomarPantallazo(indicator,'14')
            })

            it('Then I should be see a tag list', () => {
                tags.getTagListTitle().should("exist")
            })
        })

    })

})
*/