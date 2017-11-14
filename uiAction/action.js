let assert = require('assert');
let loginPage = require('../comm/loginPage');
let registerPage = require('../comm/registerPage');
let forgetPage = require('../comm/forgetPage');
let topicPage = require('../comm/topicPage');
let replyPage=require('../comm/replyPage');
let userRegister = async function (driver, username, pass, repass, email, message, status) {
    await driver.findElement(registerPage.pass).sendKeys(pass);
    await driver.findElement(registerPage.repass).sendKeys(repass);
    if (status == 'error') {
        await driver.findElement(registerPage.username).sendKeys(username);
        await driver.findElement(registerPage.email).sendKeys(email);
        driver.findElement(registerPage.registerBtn).click();
        let arrtip = await driver.findElement(registerPage.errorInfo).getText();
        return assert.deepEqual(message, arrtip);
    } else {
        await driver.findElement(registerPage.username).sendKeys(username);
        await driver.findElement(registerPage.email).sendKeys(email);
        driver.findElement(registerPage.registerBtn).click();
        let suc = await driver.findElement(registerPage.successInfo).getText();
        return assert.deepEqual(suc, message);

    }
}

let userLogin = async function (driver, username, password, message, status) {
    await driver.findElement(loginPage.username).sendKeys(username);
    await driver.findElement(loginPage.password).sendKeys(password);
    driver.findElement(loginPage.loginBtn).click();
    if (status == 'error') {
        let text2 = await driver.findElement(loginPage.errorInfo).getText();
        return assert.deepEqual(text2, message);
    } else {
        let text1 = await driver.findElement(loginPage.successInfo).getText();
        return assert.deepEqual(text1, message);
    }

}

let userForget = async function (driver, email, message) {
    await driver.findElement(forgetPage.email).sendKeys(email);
    driver.findElement(forgetPage.submit).click();
    let text4 = await driver.findElement(forgetPage.messageInfo).getText();
    return assert.deepEqual(text4, message);
}

let userTopic = async function (driver, tab, title, path, content, status, errormsg) {
    switch (tab) {
        case "请选择":
            driver.findElement(topicPage.select).click();
            break;
        case "分享":
            driver.findElement(topicPage.share).click();
            break;
        case "问答":
            driver.findElement(topicPage.ask).click();
            break;
        case "招聘":
            driver.findElement(topicPage.job).click();
            break;

        default:
            break;
    }
    await driver.findElement(topicPage.title).sendKeys(title);
    if (path !== "null") {
        await driver.findElement(topicPage.image).click();
        await driver.findElement(topicPage.imagePath).sendKeys(path);
        await driver.sleep(2 * 1000);
    }
    await driver.findElement(topicPage.content).click();
    let text = await driver.findElement(topicPage.contentEditor);
    driver.actions().mouseMove(text).sendKeys(content).perform();
    await driver.findElement(topicPage.submit).click();
    if (status == "success") {
        let asserttitle = await driver.findElement(topicPage.sucessTitle).getText();
        return assert.deepEqual(asserttitle, title);
    } else if (status == 'tabError') {
        let alert = await driver.switchTo().alert().getText();
        // console.log("alert ==> ", alert, "errormsg--->", errormsg);
        return assert.deepEqual(alert, errormsg);

    } else {
        let assertErrMsg = await driver.findElement(topicPage.errorMsg).getText();
        // console.log("assertErrMsg", assertErrMsg);
        return assert.deepEqual(assertErrMsg, errormsg);
    }
}

let userReply = async function (driver, path, content, status, successMsg, errorMsg) {
    driver.executeScript('document.querySelector("#reply_form .CodeMirror-scroll").scrollIntoView();');
    if (path !== "null") {
        driver.findElement(replyPage.image).click();
        driver.findElement(replyPage.imagePath).sendKeys(path);
        driver.sleep(2 * 1000);
        driver.findElement(replyPage.content).click();
        let text = await driver.findElement(replyPage.contentEditor);
        driver.actions().mouseMove(text).sendKeys(content).perform();
        driver.findElement(replyPage.replyBtn).click();
        if (status == "success") {
            let text2 = await driver.findElement(replyPage.successMsg).getText();
            return assert.deepEqual(text2, successMsg);
        } else {
            let text3 = await driver.findElement(replyPage.errorMsg).getText();
            return assert.deepEqual(text3, errorMsg);
        }
    }
}



exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.userForget = userForget;
exports.userTopic = userTopic;
exports.userReply = userReply

