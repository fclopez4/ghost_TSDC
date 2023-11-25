import BoletinPage from "../pages/boletin"
import Login from "../pages/login"
import { faker } from '@faker-js/faker'

const login = new Login()
const boletinPage = new BoletinPage()

describe("EP017 create newsletter - A-PRIORI", () => {
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

        context("When I create a empty newsletter", () => {
            beforeEach(() => {
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
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

        context("When I create newsletter with a existing name", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', name)
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


        context("When I create newsletter with name description longer than 191 characteres", () => {
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

describe("EP018 edit  newsletter - A-PRIORI", () => {
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

describe("EP019 create newsletter - A-PRIORI ", () => {
    let data;
    let name;
    context('Given I go to newsletter page ', () => {
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

        context("When I create a empty newsletter", () => {
            beforeEach(() => {
                boletinPage.clickCreate();
                cy.wait(3000)
            })
            it("Then I should see the message 'Please enter a name.'", () => {
                boletinPage.getRespose().should("contain.text", "Please enter a name.");
            })
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

        context("When I create newsletter with a existing name", () => {
            beforeEach(() => {
                boletinPage.fillTagById('#newsletter-title', name)
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


        context("When I create newsletter with name description longer than 191 characteres", () => {
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

describe("EP0120 edit  newsletter - API", () => {
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