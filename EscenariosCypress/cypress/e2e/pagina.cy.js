import Login from "../pages/login"
import Editor from "../pages/editor"
import Pagina from "../pages/pagina"

const login = new Login()
const editor = new Editor()
const pagina = new Pagina()


describe("scenery #2 create page", () => {
    context('Given I go to page page', () => {
        var cockieValue

        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cockieValue = cookie.value;
            });
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cockieValue)
            pagina.visit()
        })

        context("When I click on new pagina button", () => {
            beforeEach(() => {
                pagina.clickNewPage()
                cy.wait(1000)
            })
            it("Then I should see a new  page", () => {
                editor.getEstatusTittle().should("contain.text", "New")
            })
        })

        context("When I fill the title and content", () => {
            const namePage = createRandomWord(10)
            beforeEach(() => {
                pagina.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(createRandomWord(40))
            })
            it("Then I should see the title and content filled", () => {
                editor.getTitle().should('have.value', namePage);
            })
        })

        context('When I fill the page and publish', () => {
            const namePage = createRandomWord(10)
            beforeEach(() => {
                pagina.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(createRandomWord(30))
                editor.clickPublish()
                cy.wait(1000)
                editor.clickButtonFinalReview()
                cy.wait(1000)
                editor.clickButtonPublishRighNow();
                cy.wait(1000)
                pagina.visit()
                pagina.clickFilterByTypeAndName('All pages', 'Published pages');
                cy.wait(1000)
            })
            it("Then I should see the page published", () => {
                expect(pagina.getPageByTitle(namePage)).to.exist
            })
        })

        context('When I add', () => {
            const namePage = createRandomWord(10);
            const nameImage = createRandomWord(10);
            beforeEach(() => {
                pagina.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.clickOptionMore('Image');
                editor.uploadImage(nameImage)
                cy.wait(2000)
            })
            it("Then I should see the page published", () => {
                expect(editor.getImage(nameImage)).to.exist;
            })
        })


        context('When I fill the page and dont publish to be create page', () => {
            const namePage = createRandomWord(10)
            beforeEach(() => {
                pagina.clickNewPage()
                cy.wait(1000)
                editor.fillTitle(namePage, 'Page title')
                editor.fillContent(createRandomWord(40))
                cy.wait(1000)
                pagina.visit()
            })
            it("Then I should see the page published", () => {
                pagina.getPageByTitle(namePage).should("contain.text", namePage)
            })
        })
    })

})



function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function (limit) {
            return Math.floor(Math.random() * limit);
        },
        i, word = '',
        length = parseInt(length, 10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i = 0; i < length / 2; i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
        word += i * 2 < length - 1 ? randVowel : '';
    }
    return word;
}