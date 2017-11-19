let { defineSupportCode } = require('cucumber');
let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');
let { getrootPath } = require('../../uiAction/util');
defineSupportCode(function ({ Before, After }) {
    Before(async function () {
        await this.driver.manage().window().maximize();
    })
    After(async function (testcase) {
        let dirname = new Date().toLocaleDateString();
        let filename = new Date().toLocaleTimeString().replace(/:/g, '_');
        console.log(dirname, filename);
        let dirpath = path.join(getrootPath(), dirname);
        if (!fs.existsSync(dirpath)) {
            mkdirp(dirpath);
        }
        if (testcase.result.status !== "passed") {
            await this.driver.takeScreenshot().then(function (imagedata) {
                fs.writeFileSync(dirpath + '/' + filename + testcase.pickle.name + '.png', imagedata, 'base64');
            })
            return this.driver.quit();
        }
    })
})

