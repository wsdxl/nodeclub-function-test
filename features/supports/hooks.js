let { defineSupportCode } = require('cucumber');
let fs = require('fs');
let { getImageFilesPath } = require('../../uiAction/util');
let { getScreenshotsPath } = require('../../uiAction/util');
defineSupportCode(function ({ Before, After }) {
    Before(async function () {
        await this.driver.manage().window().maximize();
    })
    // After(async function (testcase) {
    //     await this.driver.takeScreenshot().then(function (imagedata) {
    //         fs.writeFileSync(getScreenshotsPath() + '/' + day + '.png', imagedata, 'base64');
    //     })

    //     return this.driver.quit();
    // })
    After(async function (testcase) {
        console.log(testcase.result.status)
        if (testcase.result.status !== "passed") {
            await this.driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(getScreenshotsPath() + '/' + testcase.pickle.name + '.png', imagedata, 'base64');
            })
            return this.driver.quit();
        }
    })
})

