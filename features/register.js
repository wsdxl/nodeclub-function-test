let { defineSupportCode } = require('cucumber');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    Given('进入首页', function () {
        return this.driver.get('http://192.168.75.107:3000/');
    });
    When('点击注册按钮，跳转到注册页面，注册页面左上角有{string}标签', async function (string) {
        this.driver.findElement({ css: ' div.navbar > div > div > ul > li:nth-child(5) > a' }).click();
        let text = await this.driver.findElement({ css: 'li.active' }).getText();
        console.log(text);
        return assert.deepEqual(text, string);
    });
    When('导航到注册页面', function () {
        return this.driver.findElement({ css: 'body > div.navbar > div > div > ul > li:nth-child(5) > a' }).click();
    });
    Then('用户名输入{string},密码输入{string},确认密码输入{string},邮箱输入{string}', function (string, string2, string3, string4
    ) {
        this.driver.findElement({ id: 'loginname' }).sendKeys(string);
        this.driver.findElement({ id: 'pass' }).sendKeys(string2);
        this.driver.findElement({ id: 're_pass' }).sendKeys(string3);
        return this.driver.findElement({ id: 'email' }).sendKeys(string4);
    });
    Then('点击提交按钮，注册成功，提示,{string}', async function (string) {
        this.driver.findElement({ css: '.span-primary' }).click();
        let suc = await this.driver.findElement({ css: 'strong' }).getText();
        console.log(suc);
        return assert.deepEqual(suc, string);
    });
    Then('点击注册的按钮，得到提示{string}',async function (string) {
        this.driver.findElement({ css: '.span-primary' }).click();
        let arrtip = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(string, arrtip);
    });
})
