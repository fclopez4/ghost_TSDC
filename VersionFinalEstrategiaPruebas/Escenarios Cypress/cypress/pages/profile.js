


class Profile {
    visit() {
        cy.visit("/ghost/#/")
        cy.get(`div.ember-view.ember-basic-dropdown-trigger.outline-0.pointer`).click();
        cy.wait(500)
        cy.get(`[data-test-nav="user-profile"]`).click().type('{esc}');
        cy.wait(1000)
    }
    // Start user Name input
    fillUserName(string) {
        return cy.get("#user-name").clear().type(string).tab();
    }

    lostFocusnameInput() {
        return cy.get("#user-name").type(string);
    }

    nameInputIsValid() {
        let input = cy.get("#user-name").first()
        return input.parent().should('have.class', 'success');
    }

    nameInputIsInvalid() {
        let input = cy.get("#user-name").first()
        return input.parent().should('have.class', 'error');
    }
    // End user Name input


    // Start slug input
    fillSlug(string) {
        return cy.get("#user-slug").clear().type(string).tab();
    }

    lostFocusslugInput() {
        return cy.get("#user-slug").type(string);
    }

    slugInputIsValid() {
        // cy.get('[data-test-error="user-slug"]')
        let input = cy.get("#user-slug").first()
        return input.parent().find('.response').should('not.be.visible');
    }

    slugInputIsInvalid() {
        let input = cy.get("#user-slug").first()
        return input.parent().find('.response').should('be.visible');
    }
    // End slug input


    // Start user email input
    fillEmail(string) {
        return cy.get("#user-email").clear().type(string).tab();
    }

    lostFocusnameEmail() {
        return cy.get("#user-email").type(string);
    }

    emailInputIsValid() {
        let input = cy.get("#user-email").first()
        return input.parent().should('have.class', 'success');
    }

    emailInputIsInvalid() {
        let input = cy.get("#user-email").first()
        return input.parent().should('have.class', 'error');
    }
    // End user email input

    // Start location input
    fillLocation(string) {
        return cy.get("#user-location").clear().type(string).tab();
    }

    lostFocusnameInput() {
        return cy.get("#user-location").type(string);
    }

    locationInputIsValid() {
        let input = cy.get("#user-location").first()
        return input.parent().should('have.class', 'success');
    }

    locationInputIsInvalid() {
        let input = cy.get("#user-location").first()
        return input.parent().should('have.class', 'error');
    }
    // End location input

    // Start website website
    fillWebsite(string) {
        return cy.get("#user-website").clear().type(string).tab();
    }

    websiteInputIsValid() {
        let input = cy.get("#user-website").first()
        return input.parent().should('have.class', 'success');
    }

    websiteInputIsInvalid() {
        let input = cy.get("#user-website").first()
        return input.parent().should('have.class', 'error');
    }
    // End website input

    // Start Facebook profile input
    fillFacebook(string) {
        return cy.get("#user-facebook").clear().type(string).tab();
    }

    facebookInputIsValid() {
        let input = cy.get("#user-facebook").first()
        return input.parent().should('have.class', 'success');
    }

    facebookInputIsInvalid() {
        let input = cy.get("#user-facebook").first()
        return input.parent().should('have.class', 'error');
    }
    // End Facebook profile input

    // Start Twitter profile input
    fillTwitter(string) {
        return cy.get("#user-twitter").clear().type(string).tab();
    }

    twitterInputIsValid() {
        let input = cy.get("#user-twitter").first()
        return input.parent().should('have.class', 'success');
    }

    twitterInputIsInvalid() {
        let input = cy.get("#user-twitter").first()
        return input.parent().should('have.class', 'error');
    }
    // End Twitter profile input

    // Start Bio input
    fillBio(string) {
        return cy.get("#user-bio").clear().type(string).tab();
    }

    bioInputIsValid() {
        let input = cy.get("#user-bio").first()
        return input.parent().should('have.class', 'success');
    }

    bioInputIsInvalid() {
        let input = cy.get("#user-bio").first()
        return input.parent().should('have.class', 'error');
    }
    // End Bio input


    // Start password input
    fillOldPassword(password) {
        return cy.get("#user-password-old").clear().type(password).tab();
    }

    fillNewPassword(password) {
        return cy.get("#user-password-new").clear().type(password).tab();
    }

    fillNewPasswordConfirmation(password) {
        return cy.get("#user-new-password-verification").clear().type(password).tab();
    }

    clickChangePassword() {
        return cy.get(`[data-test-save-pw-button="true"]`).click();
    }

    notificactionPassword() {
        return cy.get(`.gh-notification.gh-notification-passive > [data-test-text="notification-content"]`).should('be.visible');
    }

    notificactionPasswordIncorrect() {
        return cy.get(`.gh-alert.gh-alert-red>.gh-alert-content`).should('contain.text', 'Your password is incorrect.');
    }

    restorePassword(password) {
        this.fillOldPassword(password);
        this.fillNewPassword(Cypress.env('password'));
        this.fillNewPasswordConfirmation(Cypress.env('password'));
        this.clickChangePassword();
        this.notificactionPassword();
    }


    // end password input

}

module.exports = Profile