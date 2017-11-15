let { defineSupportCode } = require('cucumber');
let assert = require('assert');
let action = require('../../uiAction/action');
let app = require('../../app.confifg');
defineSupportCode(function ({ Given, When, Then }) {
    Given('用户登录,用户名输入{string},密码输入{string},成功登录', function (string, string2) {
        this.driver.get(app.baseUrl);
        this.driver.findElement({ css: 'ul > li:nth-child(6) > a' }).click();
        this.driver.findElement({ id: 'name' }).sendKeys(string);
        this.driver.findElement({ id: 'pass' }).sendKeys(string2);
        return this.driver.findElement({ css: ".span-primary" }).click();
    });
    When('点击发布话题，跳转到发帖页面，左上角有{string}标签', async function (string) {
        this.driver.findElement({ css: '#create_topic_btn > span' }).click();
        let text = await this.driver.findElement({ css: 'li.active' }).getText();
        return assert.deepEqual(text, string);
    });
    When('导航到发帖页面', function () {
        return this.driver.findElement({ css: '#create_topic_btn > span' }).click();
    });
    let tab,title,imageFileName,content;
    Then('板块选择{string},标题输入{string},点击照片输入路径{string} ，输入内容{string}', async function (string, string2, string3, string4) {
        tab=string;
        title=string2;
        imageFileName=string3;
        content=string4;
    });
    Then('点击提交按钮,成功或者失败{string}.成功跳转到首页，得到新的标题，失败得到错误提示{string}', async function (string, string2) {
        return action.userTopic(this.driver,tab,title,imageFileName,content,string,string2);
    });
})