import { faker } from '@faker-js/faker';

import Login from "../pages/login"
import Editor from "../pages/editor"
import Pagina from "../pages/page"

const login = new Login()
const editor = new Editor()
const page = new Pagina()

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
describe('EP001 create page - ALEATORIO', () => {
    let cookieValue
    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should create page', () => {
        const pageName = faker.animal.bear()

        cy.given('I click on new page page', () => {
            page.clickNewPage()
        })

        cy.when('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I insert content', () => {
            editor.fillContent(faker.lorem.paragraphs())
        })

        cy.ands('I publish page', () => {
            editor.publish()
            page.reload()
            page.visit()
        })

        cy.then2('I see the page published in list', () => {
            page.getPageByTitle(pageName).should('exist')
        })
    })
})

describe('EP007 edit page - ALEATORIO', () => {
    let cookieValue

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should edit a page', () =>{
        let pageFirstTitle = faker.person.jobTitle()
        let pageSecondTitle = faker.person.jobTitle()

        cy.given('I click on new page', () => {
            page.clickNewPage()
        })

        cy.when('I Fill title and content of page', () => {
            editor.fillTitle(pageFirstTitle, 'Page title')
            editor.fillContent(faker.lorem.sentences())
        })

        cy.ands('I save page as a draft', () => {
            editor.clickButtonBackEditor()
            page.reload()
            page.visit()
        })

        cy.ands('I edit the page title', () => {
            page.clickPageListLink(pageFirstTitle)
            editor.clearTitle('Page title')
            editor.fillTitle(pageSecondTitle, 'Page title')
        })

        cy.ands('I save page as a draft, again', () => {
            editor.clickButtonBackEditor()
            page.reload()
            page.visit()
        })

        cy.then2('Then I should see the new title in the page list', () => {
            page.getListPageTitles().contains(pageSecondTitle).should('exist')
        })

    })
})

describe('EP003 create a page with a title longer than 256 characters - ALEATORIO', () => {
    let cookieValue

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should create a page with a title longer than 256 characters', () => {
        const pageName = faker.lorem.words(256).substring(0, 256)

        cy.given('I click on new post page', () => {
            page.clickNewPage()
        })

        cy.when('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I insert content', () => {
            editor.fillContent(faker.lorem.paragraphs())
        })

        cy.ands('I publish the page', () => {
            editor.clickPublish()
        })

        cy.then2('I see alert Update failed', () => {
            page.getNotificationAlert().should('contain.text', 'Title cannot be longer than 255 characters')
        })
    })
})

describe("EP015 update publish date in page with data valid - ALEATORIO", () => {
    let cookieValue

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid date in page', () => {
        const pageName = faker.animal.bear()
        const pageContent = faker.lorem.words(15)
        const date = faker.date.past()
        const dateInput = editor.generateDate(date)
        const timeInput = editor.gerateTime(date)

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I insert content', () => {
            editor.fillContent(pageContent);
        })

        cy.when('I click in page option settings', () => {
            editor.clickSettingsOption();
        })

        cy.ands('I insert publish date', () => {
            editor.fillPublishDate(dateInput);
        });

        cy.ands('I insert a time', () => {
            editor.fillPublishTime(timeInput)
        })

        cy.then2('The error date message should not exist', () => {
            editor.getErrorDateTime().should('not.exist')
        })
    })
})

describe("EP016 update publish date in page with future date - ALEATORIO", () => {
    let cookieValue

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid date in page', () => {
        const pageName = faker.animal.bear()
        const pageContent = faker.lorem.words(15)
        const date = faker.date.future()
        const dateInput = editor.generateDate(date)
        const timeInput = editor.gerateTime(date)

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I insert content', () => {
            editor.fillContent(pageContent);
        })

        cy.when('I click in page option settings', () => {
            editor.clickSettingsOption();
        })

        cy.ands('I insert publish date', () => {
            editor.fillPublishDate(dateInput);
        });

        cy.ands('I insert a time', () => {
            editor.fillPublishTime(timeInput)
        })

        cy.then2('The error date message should exist', () => {
            editor.getErrorDateTime().should('exist')
        })
    })

})

describe("EP017 update publish date in page with today date - ALEATORIO", () => {
    let cookieValue

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid date in page', () => {
        const pageName = faker.animal.bear()
        const pageContent = faker.lorem.words(15)
        const date = new Date()
        const dateInput = editor.generateDate(date)
        const timeInput = editor.gerateTime(date)

        cy.given('I click on new page post', () => {
            page.clickNewPage()
        })

        cy.ands('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I insert content', () => {
            editor.fillContent(pageContent);
        })

        cy.when('I click in page option settings', () => {
            editor.clickSettingsOption();
        })

        cy.ands('I insert publish date', () => {
            editor.fillPublishDate(dateInput);
        });

        cy.ands('I insert a time', () => {
            editor.fillPublishTime(timeInput)
        })

        cy.then2('I validate error date time', () => {
            editor.getErrorDateTime().should('not.exist')
        })
    })
})

describe("EP020 create facebook card with limit data - ALEATORIO", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })
    
    it('should create a facebook card', () => {
        const pageName = faker.animal.bear()
        const titleFacebook = faker.lorem.words(300).substring(0, 300)
        const descriptionFacebook = faker.lorem.words(500).substring(0, 500)
        const fileName = datosBase[2].name_image;
        const filePath = 'cypress/fixtures/post/files/image-valid-post.jpg';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I insert title', () => {
            editor.fillTitle(pageName, 'Page title')
        })

        cy.ands('I click in page option settings', () => {
            editor.clickSettingsOption();
        })

        cy.ands('I click in facebook card', () => {
            editor.clickFacebookCard();
        })

        cy.when('I insert facebook image', () => {
            editor.fillFacebookImage(fileName, filePath);
        })

        cy.then2('I see the image feature', () => {
            expect(editor.getImage(fileName)).exist
        })

        cy.when('I insert facebook title with 300 characters', () => {
            editor.fillFacebookTitle(titleFacebook);
        })

        cy.then2('I see the title facebook form valid', () => {
            cy.wait(1000)
            expect(editor.facebookInputTitleIsValid(), true);
        })

        cy.when('I insert facebook description with 500 characters', () => {
            editor.fillFacebookDescription(descriptionFacebook);
        })

        cy.then2('I see the description facebook form valid', () => {
            cy.wait(1000)
            expect(editor.facebookInputDescIsValid(), true);
        })
        
    })
})

/* APRIORI */
describe('EP004 add a valid feature image - APRIORI', () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should add a valid feature image', () => {
        const fileName = datosBase[0].name_image;
        const filePath = 'cypress/fixtures/post/files/image-valid-post.jpg';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.when('I upload image', () => {
            editor.uploadFixtureImage(fileName, filePath)
        })

        cy.then2('I see the image feature', () => {
            expect(editor.getImage(fileName)).exist
        })
    })
})

describe('EP005 add a invalid feature image format - APRIORI', () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should add a valid feature image', () => {
        const fileName = datosBase[2].name_image;
        const filePath = 'cypress/fixtures/post/files/invalid-file.json';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.when('I upload image', () => {
            editor.uploadFixtureImage(fileName, filePath)
            cy.wait(1000)
        })

        cy.then2('I see the image feature error message', () => {
            editor.getErrorMessageUploadFixture();
        })
    })
})

describe("EP006 add an image to a page - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it("should add an image to a page", () => {
        const fileName = datosBase[1].name_image;
        const filePath = 'cypress/fixtures/post/files/image-valid-post.jpg';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Image');
        })

        cy.when('I upload image', () => {
            editor.uploadImage(fileName, filePath)
            cy.wait(1000)
        })

        cy.then2('I see the image into page', () => {
            expect(editor.getImage(fileName)).exist
        })
    })
})

describe("EP008 add a video valid to a page - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid video', () => {
        const fileName = datosBase[4].name_video;
        const filePath = 'cypress/fixtures/post/files/video-valid-post.mp4';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Video');
        })

        cy.when('I upload video', () => {
            editor.uploadVideo(fileName, filePath)
            cy.wait(1000)
        })

        cy.then2('I see the video into page', () => {
            expect(editor.getImage(fileName)).exist
        })
    })
})

describe("EP009 add a video invalid to a page - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should add a invalid video', () => {
        const fileName = datosBase[5].name_image;
        const filePath = 'cypress/fixtures/post/files/invalid-file.json';

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Video')
        })

        cy.when('I upload image', () => {
            editor.uploadVideo(fileName, filePath)
            cy.wait(1000)
        })

        cy.then2('I see error message', () => {
            expect(editor.getErrorFileUpload()).to.exist
        })

        Cypress.on('uncaught:exception', () => {
            return false
        })
    })
});

describe("EP012 add a gallery valid to a page - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
            page.visit()
        })

    it('should add a valid gallery', () => {
        const fileNamesPahts = [];
        const numberImages = 5;

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Gallery');
        })

        cy.ands('I create files path', () => {
            for (let i = 0; i < numberImages; i++) {
                fileNamesPahts.push({
                    fileName: datosBase[7].name_image,
                    filePath: `cypress/fixtures/post/files/image-valid-post-0${i + 1}.png`
                })
            }
        })

        cy.when('I upload gallery', () => {
            editor.uploadGaleryImages(fileNamesPahts)
            cy.wait(1000)
        })

        cy.then2('I see the imagves into gallery post', () => {
            fileNamesPahts.forEach((fileName) => {
                expect(editor.getImage(fileName.fileName)).exist
            })
        })
    })
})

describe("EP013 add limit images to a gallery post - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid gallery', () => {
        const fileNamesPahts = [];
        const numberImages = 9;

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Gallery');
        })

        cy.ands('I create files path', () => {
            for (let i = 0; i < numberImages; i++) {
                fileNamesPahts.push({
                    fileName: datosBase[7].name_image,
                    filePath: `cypress/fixtures/post/files/image-valid-post-0${i + 1}.png`
                })
            }
        })

        cy.when('I upload gallery', () => {
            editor.uploadGaleryImages(fileNamesPahts)
            cy.wait(1000)
        })

        cy.then2('I see the imagves into gallery post', () => {
            fileNamesPahts.forEach((fileName) => {
                expect(editor.getImage(fileName.fileName)).exist
            })
        })
    })
})

describe("EP014 add more to limit images to a gallery post - APRIORI", () => {
    let cookieValue
    let datosBase

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cookieValue = cookie.value;
        });

        cy.fixture('post/post-valid.json').then((datos) => {
            datosBase = datos;
        });
    })

    beforeEach(() => {
        cy.setCookie('ghost-admin-api-session', cookieValue)
        page.visit()
    })

    it('should add a valid gallery', () => {
        const fileNamesPahts = [];
        const numberImages = 10;

        cy.given('I click on new page button', () => {
            page.clickNewPage()
        })

        cy.ands('I click in more option', () => {
            editor.clickOptionMore('Gallery');
        })

        cy.ands('I create files path', () => {
            for (let i = 0; i < numberImages; i++) {
                fileNamesPahts.push({
                    fileName: datosBase[7].name_image,
                    filePath: `cypress/fixtures/post/files/image-valid-post-${i + 1 > 9 ? '' : '0'}${i + 1}.png`
                })
            }
        })

        cy.when('I upload gallery', () => {
            editor.uploadGaleryImages(fileNamesPahts)
            cy.wait(1000)
        })

        cy.then2('I see an alert with maximum images', () => {
            expect(editor.getErrorGalleryUpload()).to.exist;
        })
    })
})
