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
            
            let imagedata = await this.driver.takeScreenshot();
            fs.writeFileSync(dirpath + '/' + filename + testcase.pickle.name + '.png', imagedata, 'base64');
        }
            let imagedata1 = await this.driver.takeScreenshot();
            this.attach(imagedata1, 'image/png');
    
        return this.driver.quit();
    })
})

