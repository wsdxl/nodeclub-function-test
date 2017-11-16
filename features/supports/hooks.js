let { defineSupportCode } = require('cucumber');
let fs = require('fs');
let { getImageFilesPath } = require('../../uiAction/util');
defineSupportCode(function ({ Before, After }) {
    Before(async function () {
        await this.driver.manage().window().maximize();
    })
    After(async function () {
        await this.driver.takeScreenshot().then(function (imagedata) {
            var day = new Date().valueOf();
            fs.writeFileSync(getImageFilesPath()+'/' + day + '.png', imagedata, 'base64');
        })

        return  this.driver.quit();
    })
})