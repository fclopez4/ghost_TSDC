import BoletinPage from "../pages/boletin"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const boletinPage = new BoletinPage()

describe("EP041 Crear newsletter - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a newsletter", () => {
            let size = 0;
            beforeEach(() => {
                cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                    size = $divs.length;
                });
                boletinPage.fillTagById('#newsletter-title', name)
                boletinPage.fillTagById('#newsletter-description', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should add a new element  to the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

    })
})

describe("EP042 Crear newsletter sin nombre - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a empty newsletter", () => {
            beforeEach(() => {
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
        })

    })
})

describe("EP043 Crear newsletter con nombre mayor a 191 caracteres - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with name  longer than 191 characteres", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
            })
        })

    })
})

describe("EP044 Crear newsletter con nombre existente - A-PRIORI", () => {
    let data;
    let existingName;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            existingName = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a newsletter", () => {
            let size = 0;
            beforeEach(() => {
                boletinPage.visit()
                cy.wait(1000)
                boletinPage.clickNewLetter();
                cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                    size = $divs.length;
                });
                boletinPage.fillTagById('#newsletter-title', existingName)
                boletinPage.fillTagById('#newsletter-description', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should add a new element  to the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

        context("When I create newsletter with a existing name", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', existingName)
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'A newsletter with the same name already exists'", () => {
                boletinPage.getRespose().should("contain.text", "A newsletter with the same name already exists");
            })
        })

    })
})

describe("EP045 Crear newsletter con descripción mayor a 2001 caracteres - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with description longer than 2001 characters", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', name)
                boletinPage.fillTagById('#newsletter-description', data[0].paragraph)
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry button'", () => {
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP046 Crear newsletter con nombre y descripcion mayor a 191 y 2001 caracteres respectivamente - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with name and description longer than 191 characteres", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', data[2].description);
                boletinPage.fillTagById('#newsletter-description', data[0].paragraph);
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry' and 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP047 Editar newsletter sin nombre - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter without name", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
        })

    })
})

describe("EP048 Editar newsletter con nombre existente - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with existing name", () => {
            beforeEach(() => {
                boletinPage.visit()
                boletinPage.clickNewLetter();
                let newName = faker.word.adjective(4);
                boletinPage.fillTagById('#newsletter-title', newName)
                boletinPage.fillTagById('#newsletter-description', data[2].description)
                boletinPage.clickCreate();
                cy.wait(2000)
                boletinPage.visit()
                boletinPage.selectNewsLetter()
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.fillTagById('#newsletter-title', newName)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'already exists'", () => {
                boletinPage.getRespose().should("contain.text", "already exists");
            })
        })

    })
})

describe("EP049 Editar newsletter con nombre mayor a 191 - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with name longer than 191 characteres ", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.fillTagById('#newsletter-title', data[2].description)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
            })
        })

    })
})

describe("EP050 Editar newsletter con descripción mayor a 2001 - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with description longer than 2001 characteres ", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-description');
                boletinPage.fillTagById('#newsletter-description', data[2].paragraph)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message Retry", () => {
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP051 Editar newsletter con email incorrecto - A-PRIORI", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.fixture('newsletter.json').then((fData) => {
                data = fData;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter incorrect format email ", () => {
            beforeEach(() => {
                boletinPage.expandEmailSection();
                boletinPage.fillTagById('input[placeholder="noreply@localhost"]', data[3].name)
                boletinPage.clickSaveAndClose();
            })
            it("Then I should see the message 'Invalid email.'", () => {
                boletinPage.getRespose().should("contain.text", "Invalid email.");
            })
        })

    })
})

/**
 * Pruebas Con el API (pseudo) aleatorio dinámico
 */
describe("EP052 Crear newsletter - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a newsletter", () => {
            let size = 0;
            beforeEach(() => {
                cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                    size = $divs.length;
                });
                boletinPage.fillTagById('#newsletter-title', name)
                boletinPage.fillTagById('#newsletter-description', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should add a new element  to the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

    })
})

describe("EP053 Crear newsletter sin nombre - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a empty newsletter", () => {
            beforeEach(() => {
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
        })

    })
})

describe("EP054 Crear newsletter con nombre mayor a 191 caracteres - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with name  longer than 191 characteres", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
            })
        })

    })
})

describe("EP055 Crear newsletter con nombre existente - (pseudo) aleatorio dinámico", () => {
    let data;
    let existingName;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            existingName = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create a newsletter", () => {
            let size = 0;
            beforeEach(() => {
                boletinPage.visit()
                cy.wait(1000)
                boletinPage.clickNewLetter();
                cy.get('.sortable-objects').find('div.draggable-object').should(($divs) => {
                    size = $divs.length;
                });
                boletinPage.fillTagById('#newsletter-title', existingName)
                boletinPage.fillTagById('#newsletter-description', data[0].description)
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should add a new element  to the card'", () => {
                cy.get('.sortable-objects').find('div.draggable-object').should('have.length', (size+1));
            })
        })

        context("When I create newsletter with a existing name", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', existingName)
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'A newsletter with the same name already exists'", () => {
                boletinPage.getRespose().should("contain.text", "A newsletter with the same name already exists");
            })
        })

    })
})

describe("EP056 Crear newsletter con descripción mayor a 2001 caracteres - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with description longer than 2001 characters", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', name)
                boletinPage.fillTagById('#newsletter-description', data[0].paragraph)
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry button'", () => {
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP057 Crear newsletter con nombre y descripcion mayor a 191 y 2001 caracteres respectivamente - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.clickNewLetter();
        })

        context("When I create newsletter with name and description longer than 191 characteres", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', data[2].description);
                boletinPage.fillTagById('#newsletter-description', data[0].paragraph);
                boletinPage.clickCreate();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Retry' and 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP058 Editar newsletter sin nombre - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter without name", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
        })

    })
})

describe("EP059 Editar newsletter con nombre existente - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with existing name", () => {
            beforeEach(() => {
                boletinPage.visit()
                boletinPage.clickNewLetter();
                let newName = faker.word.adjective(4);
                boletinPage.fillTagById('#newsletter-title', newName)
                boletinPage.fillTagById('#newsletter-description', data[2].description)
                boletinPage.clickCreate();
                cy.wait(2000)
                boletinPage.visit()
                boletinPage.selectNewsLetter()
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.fillTagById('#newsletter-title', newName)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'already exists'", () => {
                boletinPage.getRespose().should("contain.text", "already exists");
            })
        })

    })
})

describe("EP060 Editar newsletter con nombre mayor a 191 - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with name longer than 191 characteres ", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-title');
                boletinPage.fillTagById('#newsletter-title', data[2].description)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message 'Cannot be longer than 191 characters'", () => {
                boletinPage.getRespose().should("contain.text", "Cannot be longer than 191 characters");
            })
        })

    })
})

describe("EP061 Editar newsletter con descripción mayor a 2001 - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter with description longer than 2001 characteres ", () => {
            beforeEach(() => {
                boletinPage.clearTagById('#newsletter-description');
                boletinPage.fillTagById('#newsletter-description', data[2].paragraph)
                boletinPage.clickSaveAndClose();
                cy.on('uncaught:exception', (err, runnable) => {
                    return false
                })
                cy.wait(3000)
            })
            it("Then I should see the message Retry", () => {
                boletinPage.getSpan().should("contain.text", "Retry");
            })
        })

    })
})

describe("EP062 Editar newsletter con email incorrecto - (pseudo) aleatorio dinámico", () => {
    let data;
    let name;
    context('Given I go to newsletter page', () => {
        let cookieValue
        before(() => {
            login.insertLogin()
            cy.getCookie('ghost-admin-api-session').then((cookie) => {
                cookieValue = cookie.value;
            });
            cy.request({
                method: 'GET',
                url: 'https://my.api.mockaroo.com/newsletter.json?key=fde37d00',
            }).then((response) => {
                expect(response.status).to.equal(200);
                data = response.body;
            });
            name = faker.word.adjective(4);
        })

        beforeEach(() => {
            cy.setCookie('ghost-admin-api-session', cookieValue)
            boletinPage.visit()
            cy.wait(1000)
            boletinPage.selectNewsLetter()
        })

        context("When I edit a newsletter incorrect format email ", () => {
            beforeEach(() => {
                boletinPage.expandEmailSection();
                boletinPage.fillTagById('input[placeholder="noreply@localhost"]', data[3].name)
                boletinPage.clickSaveAndClose();
            })
            it("Then I should see the message 'Invalid email.'", () => {
                boletinPage.getRespose().should("contain.text", "Invalid email.");
            })
        })

    })
})