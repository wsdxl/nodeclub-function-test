let { defineSupportCode } = require('cucumber');
let action = require('../../uiAction/action');
let assert = require('assert');
let MongoClient = require('mongodb').MongoClient;
let app = require('../../app.confifg');
defineSupportCode(function ({ Given, When, Then }) {
    Given('进入首页', function () {
        return this.driver.get(app.baseUrl);
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
    let registerUserName, registerUserEmail;
    Then('用户名输入{string},密码输入{string},确认密码输入{string},邮箱输入{string},点击提交按钮，注册成功，提示,{string}', async function (string, string2, string3, string4, string5) {
        let day = new Date().valueOf();
        registerUserName = day + string;
        registerUserEmail = day + string4;
        return action.userRegister(this.driver, registerUserName, string2, string3, registerUserEmail, string5);
    });
    Then('用户名输入{string},密码输入{string},确认密码输入{string},邮箱输入{string},点击注册的按钮，得到提示{string}', async function (string, string2, string3, string4, string5) {
        return action.userRegister(this.driver, string, string2, string3, string4, string5, 'error');
    });
    Then('链接数据库，激活邮箱',async function () {
        return action.activeUser(`${registerUserName}`);
    });
    Then('用刚才输出的密码{string}可以成功登录', async function (string) {
        await this.driver.get(app.baseUrl+"signin");
        return action.userLogin(this.driver, `${registerUserName}`, string, `${registerUserName}`);
    });
})
