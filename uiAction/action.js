let assert = require('assert');
let loginPage = require('../comm/loginPage');
let registerPage = require('../comm/registerPage');
let forgetPage = require('../comm/forgetPage');
let topicPage = require('../comm/topicPage');
let replyPage = require('../comm/replyPage');
let setpassPage = require('../comm/setpassPage');
let { getImageFilesPath } = require('../uiAction/util');
let MongoClient = require('mongodb').MongoClient;
let app = require('../app.confifg');
let path = require('path');
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

let userTopic = async function (driver, tab, title, imageFileName, content, status, errormsg) {
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
    if (imageFileName !== "null") {
        let imagepath = path.join(getImageFilesPath(), imageFileName);
        await driver.findElement(topicPage.image).click();
        await driver.findElement(topicPage.imagePath).sendKeys(imagepath);
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

let userReply = async function (driver, imageFileName, content, status, successMsg, errorMsg) {
    driver.executeScript('document.querySelector("#reply_form .CodeMirror-scroll").scrollIntoView();');
    if (imageFileName !== "null") {
        let imagepath = path.join(getImageFilesPath(), imageFileName);
        driver.findElement(replyPage.image).click();
        driver.findElement(replyPage.imagePath).sendKeys(imagepath);
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

let setPass = async function (driver, pass, repass, status, sucMsg, errorMsg) {
    driver.executeScript(function () {
        'document.querySelector("#old_pass").scrollIntoView();'
    })
    if (status !== 'null') {
        driver.findElement(setpassPage.pass).sendKeys(pass);
        driver.findElement(setpassPage.repass).sendKeys(repass);
        driver.findElement(setpassPage.Button).click();
        if (status == 'success') {
            let text = await driver.findElement(setpassPage.message).getText();
            return assert.deepEqual(text, sucMsg);
        } else {
            let text = await driver.findElement(setpassPage.message).getText();
            return assert.deepEqual(text, errorMsg);
        }

    } else {
        driver.findElement(setpassPage.Button).click();
        let text1 = await driver.findElement(setpassPage.msg).getText();
        return assert.deepEqual(text1, errorMsg);
    }
}

let activeUser = function (user, done) {
    MongoClient.connect(app.mongodbUrl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        let collection = db.collection("users")
        // active user;

        console.log("will active the user", user)
        collection.updateOne({ name: `${user}` }, { $set: { "active": true } }, function (err, docs) {
            console.log(err, docs.result)
        })
        db.close(done);
    });
}



exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.userForget = userForget;
exports.userTopic = userTopic;
exports.userReply = userReply;
exports.setPass = setPass;
exports.activeUser=activeUser

