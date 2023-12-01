import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()

describe('Ejecucion en Ghost', function () {
    cy.on('uncaught:exception', (err) => {
        cy.task('genericLog', { 'message': `An exception occurred: ${err}` });
        cy.task('genericReport', { 'html': `<p><strong>Uncaught exception: </strong>${err}</p>` });
    });
    cy.on('window:alert', (text) => {
        cy.task('genericLog', { 'message': `An alert was fired with the message: "${text}"` });
        cy.task('genericReport', { 'html': `<p><strong>An alert was fired with the message: </strong>${text}</p>` });
    });
    cy.on('fail', (err) => {
        cy.task('genericLog', { 'message': `The test failed with the following error: ${err}` });
        cy.task('genericReport', { 'html': `<p><strong>Test failed with the error: </strong>${err}</p>` });
        return false;
    });

    it('Visita y ejecuta la pagina de post', function () {
        login.insertLogin();
        cy.visit('/ghost/#/posts');
        cy.wait(1000);
        let events = getRandomInt(0, 1000);
        for (let i = 0; i < events; i++) {
            functions[getRandomInt(0, functions.length)]();
            cy.url().then(currentUrl => {
                if (
                    !currentUrl.includes('post') &&
                    !currentUrl.includes('editor')
                ) {
                    cy.go(-1)
                }
            })
        }
    })

    it('Visita y ejecuta la pagina de tags', function () {
        login.insertLogin();
        cy.visit('/ghost/#/tags');
        cy.wait(1000);
        let events = getRandomInt(0, 1000);

        for (let i = 0; i < events; i++) {
            functions[getRandomInt(0, functions.length)]();
            cy.url().then(currentUrl => {
                if (
                    !currentUrl.includes('tags')
                ) {
                    cy.go(-1)
                }
            })
        }
    })

    it('Visita y ejecuta la pagina de NewSletter', function () {
        login.insertLogin();
        cy.visit('/#/settings/newsletters');
        cy.wait(1000);
        let events = getRandomInt(0, 1000);

        for (let i = 0; i < events; i++) {
            functions[getRandomInt(0, functions.length)]();
            cy.url().then(currentUrl => {
                if (
                    !currentUrl.includes('newsletters')
                ) {
                    cy.go(-1)
                }
            })
        }
    })
})




const functions = [clickLink, FillRandomText, clickRandomButton, randomClick, randomKeyPress, ramdomScroll];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function clickLink() {
    cy.get('a').then($links => {
        let randomLink = $links.get(getRandomInt(0, $links.length));
        if (!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({ force: true });
        }
    });
    cy.wait(1000);
}

function FillRandomText() {
    cy.get('body').then((body$) => {
        if (body$.find('input[type="text"]').length) {
            cy.get('input[type="text"]').then($inputs => {
                let randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                cy.wrap(randomInput).clear({ force: true });
                cy.wrap(randomInput).type(faker.lorem.word(), { force: true });
                cy.wait(1000);
            });
        }
    })
}

function clickRandomButton() {
    cy.get('body').then((body$) => {
        if (body$.find('button').length) {
            cy.get('button').then($button => {
                let randomButton = $button.get(getRandomInt(0, $button.length));
                cy.wrap(randomButton).click({ force: true });
            });
        }
    })
    cy.wait(500);
}

function randomClick() {
    let randX = getRandomInt(0, Cypress.config("viewportWidth"))
    let randY = getRandomInt(0, Cypress.config("viewportHeight"))
    cy.window().then((win) => {
        win.document.elementFromPoint(randX, randY)?.click({ force: true });
    })
}

function ramdomScroll() {
    let randX = getRandomInt(0, Cypress.config("viewportWidth"))
    let randY = getRandomInt(0, Cypress.config("viewportHeight"))
    cy.window().then((win) => {
        win.document.elementFromPoint(randX, randY)?.scrollIntoView({ force: true });
    })
}

function randomKeyPress() {
    const specialKeys = ['{backspace}', '{del}', '{downarrow}', '{end}', '{esc}', '{home}', '{leftarrow}', '{pagedown}', '{pageup}', '{rightarrow}', '{selectall}', '{uparrow}']
    const modifiers = ['{alt}', '{ctrl}', '{meta}', '{shift}', ""]
    const number = faker.number.int(1, 4);
    const word = faker.string.alphanumeric(faker.number.int(1, 3));

    if (number === 1) {
        let press = specialKeys[faker.number.int(0, specialKeys.length)]
        cy.get('body').type(press, { force: true });
    } else if (number === 2) {
        let press = modifiers[faker.number.int(0, modifiers.length)] + specialKeys[faker.number.int(0, specialKeys.length)]
        cy.get('body').type(press, { force: true });
    } else if (number === 3) {
        let press = modifiers[faker.number.int(0, modifiers.length)] + word
        cy.get('body').type(press, { force: true });
    } else {
        let press = modifiers[faker.number.int(0, modifiers.length)] + specialKeys[faker.number.int(0, specialKeys.length)] + word
        cy.get('body').type(press, { force: true });
    }
}