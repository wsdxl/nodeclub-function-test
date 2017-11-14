let { defineSupportCode } = require('cucumber');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到回帖页面', function () {
        return this.driver.findElement({ css: '#topic_list > div:nth-child(1) > div > a' }).click();
    });
    Then('点击照片输入路径{string},输入内容{string},点击回帖按钮，成功或者失败{string},回帖成功，页面含有{string}回帖失败，得到错误提示{string}', async function (string, string2,
        string3, string4, string5) {
        if (string !== "null") {
            this.driver.findElement({ css: '.eicon-image' }).click();
            this.driver.findElement({ name: 'file' }).sendKeys(string);
            this.driver.sleep(2 * 1000);
        }
        this.driver.executeScript('document.querySelector("#reply_form .CodeMirror-scroll").scrollIntoView();');
        this.driver.findElement({ css: '#reply_form .CodeMirror-scroll' }).click();
        let text = await this.driver.findElement({ css: 'div.CodeMirror-scroll > div:nth-child(2)' });
        this.driver.actions().mouseMove(text).sendKeys(string2).perform();
        return this.driver.findElement({ css: '.submit_btn' }).click();
        if (string3 == "success") {
            let text2 = await this.driver.findElement({ xpath: '//*[@id="content"]/div[2]/div[1] ' }).getText();
            console.log(text2);
            return assert.deepEqual(text2, string4);
        } else {
            let text3 = await this.driver.findElement({ css: 'strong' }).getText();
            return assert.deepEqual(text3, string5);
        }
    });
})