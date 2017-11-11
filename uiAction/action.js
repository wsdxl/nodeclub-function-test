let assert = require('assert');
let loginPage=require('../comm/loginPage');
let registerPage=require('../comm/registerPage');
let forgetPage=require('../comm/forgetPage');
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

let userForget=async function(driver,email,message){
    await driver.findElement({ id: 'email' }).sendKeys(email);
    driver.findElement({ css: '.span-primary' }).click();
    let text4 = await driver.findElement({ css: 'strong' }).getText();
    return assert.deepEqual(text4, message);
}


exports.userRegister = userRegister;
exports.userLogin=userLogin;
exports.userForget=userForget;