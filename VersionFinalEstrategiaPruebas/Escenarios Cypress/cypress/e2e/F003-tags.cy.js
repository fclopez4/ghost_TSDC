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

/* ALEATORIO */
describe('EP078 Fill tag title and description - ALEATORIO', () => {
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

describe('EP079 Fill google metadata tag - ALEATORIO', () => {
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

describe('EP080 Fill X card tag - ALEATORIO', () => {
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

    /*Por reportar, el diseño de alerta de errores no es consistente con  tag y google metadata*/
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

describe('EP081 Fill facebook card - ALEATORIO', () =>{
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

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(faker.string.alphanumeric(299))
            tags.fillTagFacebookDescription(faker.string.alphanumeric(499))
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and facebook card with max characters', () => {
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

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(faker.string.alphanumeric(300))
            tags.fillTagFacebookDescription(faker.string.alphanumeric(500))
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    /*Por reportar, el diseño de alerta de errores no es consistente con  tag y google metadata*/
    it('should create a tag and facebook card with max characters +1', () => {
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

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(faker.string.alphanumeric(301))
            tags.fillTagFacebookDescription(faker.string.alphanumeric(501))
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagFacebookError().should('exist')
            tags.getTagFacebookError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('EP082 Fill Code injection - ALEATORIO', () =>{
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

    it('should create a tag with Code injection and just special characters', () => {
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

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(faker.helpers.fromRegExp('[!@#$%^&*()_+{}|:<>?;"",./`~]{100}'))
            tags.fillTagCodeInjectionFooter(faker.helpers.fromRegExp('[!@#$%^&*()_+{}|:<>?;"",./`~]{100}'))
            tags.clickButtonSaveTag()
            cy.wait(1000)
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag with Code injection and IT phrases', () => {
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

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(faker.hacker.phrase())
            tags.fillTagCodeInjectionFooter(faker.hacker.verb())
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag with Code injection and IT adjectives', () => {
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

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(faker.hacker.adjective())
            tags.fillTagCodeInjectionFooter(faker.hacker.verb())
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        }) 
    })

    it('should create a tag with Code injection and IT verbs', () => {
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

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(faker.hacker.noun())
            tags.fillTagCodeInjectionFooter(faker.hacker.ingverb())
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })
})


/* APRIORI */
describe('EP083 Fill tag title and description - APRIORI', () => {
    let cookieValue
    let dataMockaroo
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('Tags/tags_title_and_description.json').then(data =>{
            dataMockaroo = data
        })        
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
            tagName = dataMockaroo[0].title_almost
            tags.fillTagNameInput(tagName.substring(0,190))
            tags.fillTagDescription(dataMockaroo[0].description_almost.substring(0,499))
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
            tagName = dataMockaroo[0].title_full
            tags.fillTagNameInput(tagName.substring(0,191))
            tags.fillTagDescription(dataMockaroo[0].description_full.substring(0,500))
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
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
            tagName = dataMockaroo[0].title_overflow
            tags.fillTagNameInput(tagName)
            tags.fillTagDescription(dataMockaroo[0].description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag error message', () => {
            tags.getTagDescriptionError().should('contain', "Description cannot be longer than 500 characters.")
            tags.getTagNameError().should('contain', "Tag names cannot be longer than 191 characters.")
        })
    });

})

describe('EP084 Fill google metadata tag - APRIORI', () => {
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('Tags/tags_metadata.json').then(data =>{
            dataMockaroo = data
        })   
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
            tagName = dataMockaroo[0].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[0].metadata_title_almost)
            tags.fillTagMetadataDescription(dataMockaroo[0].metadata_description_almost)
            tags.fillTagMetadataUrl(dataMockaroo[0].metadata_url_almost)
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
            tagName = dataMockaroo[1].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[1].metadata_title_full)
            tags.fillTagMetadataDescription(dataMockaroo[1].metadata_description_full)
            tags.fillTagMetadataUrl(dataMockaroo[1].metadata_url_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })

    })

    it('should create a tag with google metadata with max characters + 1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[2].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[2].metadata_title_overflow)
            tags.fillTagMetadataDescription(dataMockaroo[2].metadata_description_overflow)
            tags.fillTagMetadataUrl(dataMockaroo[2].metadata_url_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the metadata error', () => {
            tags.getTagMetadataTitleError().should('contain', "Meta Title cannot be longer than 300 characters.")
            tags.getTagMetadataDescriptionError().should('contain', "Meta Description cannot be longer than 500 characters.")
        })

    })
})

describe('EP085 Fill X card tag - APRIORI', () => {
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('Tags/tags_metadata.json').then(data =>{
            dataMockaroo = data
        })   
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
            tagName = dataMockaroo[3].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[3].metadata_title_almost)
            tags.fillTagXcardDescription(dataMockaroo[3].metadata_description_almost)
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
            tagName = dataMockaroo[4].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[4].metadata_title_full)
            tags.fillTagXcardDescription(dataMockaroo[4].metadata_description_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and X card with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[5].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[5].metadata_title_overflow)
            tags.fillTagXcardDescription(dataMockaroo[5].metadata_description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagXcardError().should('exist')
            tags.getTagXcardError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('EP086 Fill facebook card - APRIORI', () =>{
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('Tags/tags_metadata.json').then(data =>{
            dataMockaroo = data
        })  
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag and facebook card with max characters -1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[6].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[6].metadata_title_almost)
            tags.fillTagFacebookDescription(dataMockaroo[6].metadata_description_almost)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and facebook card with max characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[7].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[7].metadata_title_full)
            tags.fillTagFacebookDescription(dataMockaroo[7].metadata_description_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and facebook card with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[8].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[8].metadata_title_overflow)
            tags.fillTagFacebookDescription(dataMockaroo[8].metadata_description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagFacebookError().should('exist')
            tags.getTagFacebookError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('EP087 Fill Code injection - APRIORI', () =>{
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('Tags/tags_code_injection.json').then(data =>{
            dataMockaroo = data
        })  
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag with Code injection and just special characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[0].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            tags.fillTagCodeInjectionHeader(dataMockaroo[0].ci_header_special)
            tags.fillTagCodeInjectionFooter(dataMockaroo[0].ci_footer_special)
            tags.clickButtonSaveTag()
            cy.wait(1000)
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag with Code injection and suspect strings', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[1].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(dataMockaroo[1].ci_header_hack)
            tags.fillTagCodeInjectionFooter(dataMockaroo[1].ci_footer_hack)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

})


/* DINAMICO */
describe('EP088 Fill tag title and description - DINAMICO', () => {
    let cookieValue
    let dataMockaroo
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tags_01.json?key=81c442d0',
        }).then((response) => {
            expect(response.status).to.equal(200);
            dataMockaroo = response.body;
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
            tagName = dataMockaroo[0].title_almost
            tags.fillTagNameInput(tagName.substring(0,190))
            tags.fillTagDescription(dataMockaroo[0].description_almost.substring(0,499))
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
            tagName = dataMockaroo[0].title_full
            tags.fillTagNameInput(tagName.substring(0,191))
            tags.fillTagDescription(dataMockaroo[0].description_full.substring(0,500))
            tags.clickButtonSaveTag()
            tags.reload()            
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
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
            tagName = dataMockaroo[0].title_overflow
            tags.fillTagNameInput(tagName)
            tags.fillTagDescription(dataMockaroo[0].description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag error message', () => {
            tags.getTagDescriptionError().should('contain', "Description cannot be longer than 500 characters.")
            tags.getTagNameError().should('contain', "Tag names cannot be longer than 191 characters.")
        })
    });

})

describe('EP089 Fill google metadata tag - DINAMICO', () => {
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tags_02.json?key=81c442d0',
        }).then((response) => {
            expect(response.status).to.equal(200);
            dataMockaroo = response.body;
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
            tagName = dataMockaroo[0].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[0].metadata_title_almost)
            tags.fillTagMetadataDescription(dataMockaroo[0].metadata_description_almost)
            tags.fillTagMetadataUrl(dataMockaroo[0].metadata_url_almost)
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
            tagName = dataMockaroo[1].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[1].metadata_title_full)
            tags.fillTagMetadataDescription(dataMockaroo[1].metadata_description_full)
            tags.fillTagMetadataUrl(dataMockaroo[1].metadata_url_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })

    })

    it('should create a tag with google metadata with max characters + 1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[2].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a google metadata', () => {
            tags.clickButtonGoogleMetadata()
            tags.fillTagMetadataTitle(dataMockaroo[2].metadata_title_overflow)
            tags.fillTagMetadataDescription(dataMockaroo[2].metadata_description_overflow)
            tags.fillTagMetadataUrl(dataMockaroo[2].metadata_url_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the metadata error', () => {
            tags.getTagMetadataTitleError().should('contain', "Meta Title cannot be longer than 300 characters.")
            tags.getTagMetadataDescriptionError().should('contain', "Meta Description cannot be longer than 500 characters.")
        })

    })
})

describe('EP090 Fill X card tag - DINAMICO', () => {
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tags_02.json?key=81c442d0',
        }).then((response) => {
            expect(response.status).to.equal(200);
            dataMockaroo = response.body;
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
            tagName = dataMockaroo[3].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[3].metadata_title_almost)
            tags.fillTagXcardDescription(dataMockaroo[3].metadata_description_almost)
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
            tagName = dataMockaroo[4].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[4].metadata_title_full)
            tags.fillTagXcardDescription(dataMockaroo[4].metadata_description_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and X card with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[5].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a x card data', () => {
            tags.clickButtonXcard()
            cy.wait(2000)
            tags.fillTagXcardTitle(dataMockaroo[5].metadata_title_overflow)
            tags.fillTagXcardDescription(dataMockaroo[5].metadata_description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagXcardError().should('exist')
            tags.getTagXcardError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('EP091 Fill facebook card - DINAMICO', () =>{
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tags_02.json?key=81c442d0',
        }).then((response) => {
            expect(response.status).to.equal(200);
            dataMockaroo = response.body;
        });  
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag and facebook card with max characters -1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[6].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[6].metadata_title_almost)
            tags.fillTagFacebookDescription(dataMockaroo[6].metadata_description_almost)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and facebook card with max characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[7].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[7].metadata_title_full)
            tags.fillTagFacebookDescription(dataMockaroo[7].metadata_description_full)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag and facebook card with max characters +1', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[8].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a facebook card data', () => {
            tags.clickButtonFacebookCard()
            cy.wait(2000)
            tags.fillTagFacebookTitle(dataMockaroo[8].metadata_title_overflow)
            tags.fillTagFacebookDescription(dataMockaroo[8].metadata_description_overflow)
            tags.clickButtonSaveTag()
        })

        cy.then2('I should be see the tag created', () => {
            tags.getTagFacebookError().should('exist')
            tags.getTagFacebookError().should('contain', "Validation error, cannot save tag. Validation failed for")
        })
    })
})

describe('EP092 Fill Code injection - DINAMICO', () =>{
    let cookieValue
    let dataMockaroo

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.request({
            method: 'GET',
            url: 'https://my.api.mockaroo.com/tags_03.json?key=81c442d0',
        }).then((response) => {
            expect(response.status).to.equal(200);
            dataMockaroo = response.body;
        });  
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        tags.visit()
    })

    it('should create a tag with Code injection and just special characters', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[0].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            tags.fillTagCodeInjectionHeader(dataMockaroo[0].ci_header_special)
            tags.fillTagCodeInjectionFooter(dataMockaroo[0].ci_footer_special)
            tags.clickButtonSaveTag()
            cy.wait(1000)
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

    it('should create a tag with Code injection and suspect strings', () => {
        let tagName;

        cy.given('I click on create tag button', () => {
            tags.clickButtonNewTag()
        })

        cy.when('I show the title of new tag form', () => {
            tags.getTagTitle().should("contain.text", "New tag")
        })

        cy.ands('I fill a tag name', () => {
            tagName = dataMockaroo[1].title_tag
            tags.fillTagNameInput(tagName)
        })

        cy.ands('I fill a code injection header', () => {
            tags.clickButtonCodeInjection()
            cy.wait(1000)
            tags.fillTagCodeInjectionHeader(dataMockaroo[1].ci_header_hack)
            tags.fillTagCodeInjectionFooter(dataMockaroo[1].ci_footer_hack)
            tags.clickButtonSaveTag()
            tags.reload()
        })

        cy.then2('I should be see the tag created', () => {
            tags.visit()
            tags.getTagListTitle().contains(tagName).should('exist');
        })
    })

})