let { defineSupportCode } = require('cucumber');
let assert = require('assert');
let action = require('../../uiAction/action');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到回帖页面', function () {
        return this.driver.findElement({ css: '#topic_list > div:nth-child(1) > div > a' }).click();
    });
    Then('点击照片输入路径{string},输入内容{string},点击回帖按钮，成功或者失败{string},回帖成功，页面含有{string}回帖失败，得到错误提示{string}', async function (string, string2,string3, string4, string5) {
        return action.userReply(this.driver, string, string2, string3, string4, string5);
    });
})