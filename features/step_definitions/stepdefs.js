//@ts-check

const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, Capabilities, Key,until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const { readFileSync } = require('fs')

setDefaultTimeout(20 * 1000);

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
const options = new chrome.Options();
options.addExtensions(readFileSync("C:/Letznav/Automation/Cucumber-POC/apty_assist_client_chrome.crx").toString('base64')); // Provide the apty assist crx file here
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().setChromeOptions(options).withCapabilities(capabilities).build();

Given('I am on the CA PPM login page', async () => {
    await driver.get('http://111.93.27.187:8889/niku/nu#action:homeActionId');
    await driver.wait(until.elementLocated(By.className('ppm_login_field_label')));
    const element = await driver.findElement(By.className('ppm_login_field_label'));
    expect(element).to.exist;
});


When('I login to the CA PPM application', async () => {
    const userName = await driver.findElement(By.id('ppm_login_username'));
    await userName.sendKeys('admin');
    const password = await driver.findElement(By.id('ppm_login_password'));
    await password.sendKeys('apty@123');
    const submit = await driver.findElement(By.id('ppm_login_button'));
    await submit.click();

});

Then('I should click on player', async function () {
    await driver.wait(until.elementLocated(By.className('letznav-banner-container__player')));
    const player =  await driver.findElement(By.className('letznav-banner-container__player'));
    await player.click();
    const searchBar = await driver.findElement(By.className('letznav-search-bar'));
    expect(searchBar).to.exist;
});

Then('I should click on {string} in player', async (content) => {
    await driver.sleep(1000);
    const item = await driver.findElement(By.xpath(`//div[@class="row-title"]//div//span[text()='${content}']`));
    await item.click();
    const contentDisplay = await driver.findElement(By.className('custom-content-overlay'));
    expect(contentDisplay).to.exist;
});

AfterAll('end', async function(){
    await driver.quit();
});