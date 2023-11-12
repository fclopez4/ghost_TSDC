const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert')
const { faker } = require('@faker-js/faker');



// Escenarios Login
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

Then('I should see {string} title body', async function (texto) {
    const element = await this.driver.$('.gh-canvas-title');
    const textFound = await element.getText();
    return assert.strictEqual(texto, textFound);
});

Then('I click on button profile ghost', async function () {
    let element = await this.driver.$('#ember33');
    return await element.click();
});

Then('I click on button sign out ghost', async function () {
    let element = await this.driver.$('.user-menu-signout');
    return await element.click();
});

Then('I should see {string} title head', async function (texto) {
    const element = await this.driver.$('title');
    const textFound = await element.getText();
    return assert.strictEqual(texto, textFound);
});

// Escenarios Posts
let namePost = faker.animal.lion();
let descPost = faker.animal.cat();

When('I click on new post', async function () {
    const button = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');
    console.log(button);
    return await button.click();
})

When('I fill the post', async function () {
    const textArea = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    await textArea.setValue(namePost)
    await this.driver.$(`.kg-prose[role='textbox']`).click();
    this.driver.keys(descPost);
    return await this.driver.$(`.kg-prose[role='textbox']`).click();
})

When('I click on publish post', async function () {
    let element = await this.driver.$(`[data-test-button='publish-flow']`);
    return await element.click();
})

When('I click on continue, final review', async function () {
    let element = await this.driver.$(`[data-test-button='continue']`);
    return await element.click();
})

When('I click on Publish post, Right now', async function () {
    let element = await this.driver.$(`[data-test-button="confirm-publish"]`);
    return await element.click();
})

When('I filter by published posts', async function () {
    await this.driver.$(`[data-test-type-select='true']`).click();
    return await this.driver.$(`[data-option-index='2']`).click();
})

Then('I should see the post', async function () {
    const elements = await this.driver.$$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let postFound = false;
    const elemensPromises = elements.map(element => element.getText());
    let textos = await Promise.all(elemensPromises)
    postFound = textos.includes(namePost);
    return assert.strictEqual(postFound, true);
});

Then('I click on post', async function () {
    const element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a');
    return await element.click();
})

Then('I edit the post', async function () {
    namePost = faker.animal.crocodilia();
    descPost = faker.animal.fish();

    const textArea = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    await textArea.setValue(namePost)
    await this.driver.$(`.kg-prose[role='textbox']`).click();
    this.driver.keys(descPost);
    return await this.driver.$(`.kg-prose[role='textbox']`).click();
})

When('I filter by Draft posts', async function () {
    await this.driver.$(`[data-test-type-select='true']`).click();
    return await this.driver.$(`[data-option-index='1']`).click();
})

Then('I rigth click on post', async function () {
    const element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a');
    return await element.click({ button: 'right' });
})

Then('I click on delete post', async function () {
    const deletButton = await this.driver.$('ul > li:nth-child(5) > button')
    return await deletButton.click();
})

Then('I do not confirm elimination', async function () {
    const cancelButton = await this.driver.$('[data-test-button="cancel"]')
    return cancelButton.click();
})

Then('I confirm elimination', async function () {
    const cancelButton = await this.driver.$('[data-test-button="confirm"]')
    return cancelButton.click();
})

Then('The post should not be visible', async function () {
    const elements = await this.driver.$$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let postFound = false;
    const elemensPromises = elements.map(element => element.getText());
    let textos = await Promise.all(elemensPromises)
    postFound = textos.includes(namePost);
    return assert.strictEqual(postFound, false);
})

// Escenarios Pages

let namePage = faker.animal.bear();
let descPage = faker.animal.bird();

When('I click on new page', async function () {
    const button = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary');
    console.log(button);
    return await button.click();
})


When('I fill the page', async function () {
    const textArea = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    await textArea.setValue(namePage)
    await this.driver.$(`.kg-prose[role='textbox']`).click();
    this.driver.keys(descPage);
    return await this.driver.$(`.kg-prose[role='textbox']`).click();
})

When('I click on publish page', async function () {
    let element = await this.driver.$(`[data-test-button='publish-flow']`);
    return await element.click();
})

When('I click on Publish page, Right now', async function () {
    let element = await this.driver.$(`[data-test-button="confirm-publish"]`);
    return await element.click();
})

When('I filter by published page', async function () {
    await this.driver.$(`[data-test-type-select='true']`).click();
    return await this.driver.$(`[data-option-index='2']`).click();
})

Then('I should see the page', async function () {
    const elements = await this.driver.$$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let pageFound = false;
    const elemensPromises = elements.map(element => element.getText());
    let textos = await Promise.all(elemensPromises)
    console.log("textos", textos, "namePage", namePage, "esta",textos.includes(namePage));
    pageFound = textos.includes(namePage);
    return assert.strictEqual(pageFound, true);
});

Then('I click on page', async function () {
    const element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a');
    return await element.click();
})

Then('I edit the page', async function () {
    namePage = faker.animal.crocodilia();
    descPage = faker.animal.fish();

    const textArea = await this.driver.$('textarea.gh-editor-title.ember-text-area.gh-input.ember-view');
    await textArea.setValue(namePage)
    await this.driver.$(`.kg-prose[role='textbox']`).click();
    this.driver.keys(descPage);
    return await this.driver.$(`.kg-prose[role='textbox']`).click();
})

When('I filter by Draft page', async function () {
    await this.driver.$(`[data-test-type-select='true']`).click();
    return await this.driver.$(`[data-option-index='1']`).click();
})

Then('I rigth click on page', async function () {
    const element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a');
    return await element.click({ button: 'right' });
})

Then('I click on delete page', async function () {
    const deletButton = await this.driver.$('ul > li:nth-child(5) > button')
    return await deletButton.click();
})

Then('The page should not be visible', async function () {
    const elements = await this.driver.$$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let postFound = false;
    const elemensPromises = elements.map(element => element.getText());
    let textos = await Promise.all(elemensPromises)
    postFound = textos.includes(namePost);
    return assert.strictEqual(postFound, false);
})
