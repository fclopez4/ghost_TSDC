const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert')

// Ghost steps
When('I enter email ghost {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

When('I enter password ghost {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click next ghost', async function () {
    let element = await this.driver.$('#ember5');
    return await element.click();
})

Then('I should see {string} title', async function (cadena) {
    const element = await this.driver.$('title');
    const text_element = await element.getText();
    return assert.equal(text_element, cadena);
}); 

Then('I click on button profile ghost',async function () {
    let element = await this.driver.$('#ember33');
    return await element.click();
});

Then('I click on button sign out ghost',async function () {
    let element = await this.driver.$('.user-menu-signout');
    return await element.click();
});
