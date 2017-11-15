let { defineSupportCode } = require('cucumber');
let assert = require('assert');
let action = require('../../uiAction/action');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到更改密码页面', function () {
        this.driver.findElement({ css: 'li:nth-child(6) > a' }).click();
    });
    Then('当前密码输入{string},新密码输入{string},点击更改密码按钮，成功或失败{string},修改成功得到提示{string},修改失败得到提示{string}', async function (string, string2, string3, string4, string5) {
        return action.setPass(this.driver,string, string2, string3, string4, string5);
    });
})