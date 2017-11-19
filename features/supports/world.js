require('chromedriver');
let { Builder } = require('selenium-webdriver');
let { defineSupportCode } = require('cucumber');
function CustomWorld({attach}) {
    this.driver = new Builder().forBrowser('chrome').build();
    this.attach=attach;
}
defineSupportCode(function ({ setWorldConstructor }) {
    setWorldConstructor(CustomWorld);
})