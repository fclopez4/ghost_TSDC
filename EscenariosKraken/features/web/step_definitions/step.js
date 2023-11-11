const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert')
const { faker } = require('@faker-js/faker');


let namePost = faker.animal.lion();
let descPost = faker.animal.cat();

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
    const element = await this.driver.$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let text = await element.getText();
    return assert.strictEqual(text, namePost);
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
    const element = await this.driver.$$('div.posts-list.gh-list.feature-memberAttribution > .gh-posts-list-item-group > li > a > h3');
    let postFound = false;
    element.forEach(async (post, i) => {
        let text = await post.getText();
        console.log("for each " + i, text, namePost);
        if (text === namePost) {
            postFound = true;
        }
    })
    return assert.strictEqual(postFound, false);
})