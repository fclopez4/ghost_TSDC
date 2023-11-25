const Login = require("../pages/login")
const Profile = require("../pages/profile")



const login = new Login()
const profile = new Profile()

describe("F006 Profile user", () => {
    let cockieValue;
    let datosValidos;
    let datosLimite;
    let datosInvalidos;

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cockieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.log(`GIVEN: I login in ghost admin`)
        cy.setCookie('ghost-admin-api-session', cockieValue)
    })

    
    before(() => {
        cy.log(`AND: I get (pseudo) ramdom dinamic data`);

        cy.request('https://my.api.mockaroo.com/users-profile-valid.json?key=56f9c6c0').then((response) => {
            datosValidos = response.body[0];
        })

        cy.request('https://my.api.mockaroo.com/user-profile-invalid-data.json?key=56f9c6c0').then((response) => {
            datosInvalidos = response.body[0];
        })

        cy.request('https://my.api.mockaroo.com/user-profile-limite-permitido.json?key=56f9c6c0').then((response) => {
            datosLimite = response.body[0];
        })
    })

    describe('EP021 Validate input user name - DINAMICO', () => {
        it('should modify profile user name valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill user input form', () => {
                profile.fillUserName(datosValidos.full_name)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.nameInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillUserName(datosInvalidos.full_name)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.nameInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 191 characters', () => {
                profile.fillUserName(datosLimite.full_name)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.nameInputIsValid(), true)
            })
        })
    })

    describe('EP022 Validate input slug - DINAMICO', () => {
        it('should modify profile slug valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill slug form', () => {
                profile.fillSlug(datosValidos.slug)
                cy.wait(1000)
            })

            cy.then2('I see a valid input class', () => {
                expect(profile.slugInputIsValid(), true)
            })

            cy.when('I complete the entry with data with more than 191 characters', () => {
                profile.fillSlug(datosInvalidos.slug)
                cy.wait(1000)
            })

            cy.then2('I see a invalid input class', () => {
                expect(profile.slugInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 191 characters', () => {
                profile.fillSlug(datosLimite.slug)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.slugInputIsValid(), true)
            })
        })
    })

    describe('EP023 Validate input email - DINAMICO', () => {
        it('should modify profile email valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill email form', () => {
                profile.fillEmail(datosValidos.email)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.emailInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillEmail(datosInvalidos.email)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.emailInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 191 characters', () => {
                profile.fillEmail(datosLimite.email)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.emailInputIsValid(), true)
            })
        })
    })

    describe('EP024 Validate input Location - DINAMICO', () => {
        it('should modify profile location valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill location form', () => {
                profile.fillLocation(datosValidos.location)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.locationInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillLocation(datosInvalidos.location)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.locationInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 191 characters', () => {
                profile.fillLocation(datosLimite.location)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.locationInputIsValid(), true)
            })
        })
    })

    describe('EP025 Validate input Website - DINAMICO', () => {
        it('should modify profile website valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill website form', () => {
                profile.fillWebsite(datosValidos.website)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.websiteInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillWebsite(datosInvalidos.website)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.websiteInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 191 characters', () => {
                profile.fillWebsite(datosLimite.website)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.websiteInputIsValid(), true)
            })
        })
    })

    describe('EP026 Validate input Facebook profile - DINAMICO', () => {
        it('should modify profile facebook profile valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill facebook profile form', () => {
                profile.fillFacebook(datosValidos.facebook_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                cy.wait(500)
                expect(profile.facebookInputIsValid(), true)

            })

            cy.when('When I complete the entry with data with more than the 2000 character limit', () => {
                profile.fillFacebook(datosInvalidos.facebook_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.facebookInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 20000 characters', () => {
                profile.fillFacebook(datosLimite.facebook_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.facebookInputIsValid(), true)
            })
        })
    })

    describe('EP027 Validate input Twitter profile - DINAMICO', () => {
        it('should modify profile twitter profile valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill twitter profile form', () => {
                profile.fillTwitter(datosValidos.twitter_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.twitterInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillTwitter(datosInvalidos.twitter_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.twitterInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 20000 characters', () => {
                profile.fillTwitter(datosLimite.twitter_profile)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.twitterInputIsValid(), true)
            })
        })
    })

    describe('EP028 Validate input bio - DINAMICO', () => {
        it('should modify profile bio valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill bio form', () => {
                profile.fillBio(datosValidos.biography)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.bioInputIsValid(), true)
            })

            cy.when('When I complete the entry with data with more than the character limit', () => {
                profile.fillBio(datosInvalidos.biography)
                cy.wait(1000)
            })

            cy.then2('Then I see a invalid input class', () => {
                expect(profile.bioInputIsInvalid(), true)
            })

            cy.when('When I complete the entry with data with a limit of 200 characters', () => {
                profile.fillBio(datosLimite.biography)
                cy.wait(1000)
            })

            cy.then2('Then I see a valid input class', () => {
                expect(profile.bioInputIsValid(), true)
            })
        })
    })

    describe('EP029 change password valid data - DINAMICO', () => {
        it('should modify profile password valid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill old password form', () => {
                profile.fillOldPassword(Cypress.env('password'))
                cy.wait(1000)
            })

            cy.ands('I fill new password form', () => {
                console.log("password used: ",datosValidos.new_password);
                profile.fillNewPassword(datosValidos.new_password)
                cy.wait(1000)
            })

            cy.ands('I verify password form', () => {
                profile.fillNewPasswordConfirmation(datosValidos.new_password)
                cy.wait(1000)
            })

            cy.ands('I click on change password button', () => {
                profile.clickChangePassword()
                cy.wait(1000)
            })

            cy.then2('Then I see a message change password', () => {
                expect(profile.notificactionPassword(), true)
            })

            cy.ands('I restore password', () => {
                profile.restorePassword(datosValidos.new_password)
            })

        })
    })

    describe('EP030 change password with invalid old password - DINAMICO', () => {
        it('should modify profile password invalid', () => {
            cy.ands('I visit profile', () => {
                profile.visit()
            })

            cy.when('When I fill old password form', () => {
                profile.fillOldPassword(datosValidos.new_password)
                cy.wait(1000)
            })

            cy.ands('I fill new password form', () => {
                profile.fillNewPassword(datosValidos.new_password)
                cy.wait(1000)
            })

            cy.ands('I verify password form', () => {
                profile.fillNewPasswordConfirmation(datosValidos.new_password)
                cy.wait(1000)
            })

            cy.ands('I click on change password button', () => {
                profile.clickChangePassword()
                cy.wait(1000)
            })

            cy.then2('Then I see a message your password is incorrect', () => {
                expect(profile.notificactionPasswordIncorrect(), true)
            })
        })
    })

})