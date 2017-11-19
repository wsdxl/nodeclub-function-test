

// let path = require('path');


// let rootpath = path.resolve(__dirname);

// console.log("rootpath:",rootpath,"rootpath.lastIndexOf(path.sep)",rootpath.lastIndexOf(path.sep))

// let newpath=  rootpath.substring(0,rootpath.lastIndexOf(path.sep))

// console.log("newpath",newpath)

// let userinfos = {
//     a1: { username: "xiaoming", age: 13 },
//     a2: { username: "xiaohong", age: 15 }
// }

// // console.log(userinfos.a1.username,userinfos.a1.age)

// for (let key in userinfos) {
//     // console.log(key,"====>",userinfos[key])
//     for (let k in userinfos[key]) {
//         // console.log(key, "====>", k, "----", userinfos[key][k])
//     }
// }

// let { defineSupportCode } = require('cucumber');
// let fs = require('fs');

// let mkdirp = require('mkdirp');
// let path = require('path');

// let { getImageFilesPath } = require('../../uiAction/util');
// defineSupportCode(function ({ Before, After }) {
//     Before(async function () {
//         await this.driver.manage().window().maximize();
//     })
//     After(async function (testcase) {
//         console.log(testcase,testcase.result.status)

//         let now = new Date().toLocaleString().replace(/T/, ' ').replace(/:/g,'_');
//         now = now.split(" ");
//         let dirname = now[0],
//         filename = now[1];
        
//         let dirPath = path.join(screenShotsPath,now[0]);
//         console.log("dirPahth",dirPath);
//         if(!fs.existsSync(dirPath)){
//             mkdirp(dirPath);
//         }
//         if(testcase.result.status!=="passed"){

//         }
//         let fileName = now[1]+testcase.pickle.name 

// ;
//         await this.driver.takeScreenshot().then(function (imagedata) {
//             fs.writeFileSync(dirPath+'/' + fileName + '.png', imagedata, 'base64');
//         })

//         return  this.driver.quit();
//     })
// })

// let { defineSupportCode } = require('cucumber');
let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');
let { getrootPath } = require('./uiAction/util');
// defineSupportCode(function ({ Before, After }) {
//     Before(async function () {
//         await this.driver.manage().window().maximize();
//     })
//     After(async function (testcase) {
        
//         if (testcase.result.status !== "passed") {
//             await this.driver.takeScreenshot().then(function (imagedata) {
//                 fs.writeFileSync(dirpath + '/' + filename + testcase.pickle.name + '.png', imagedata, 'base64');
//             })
//             return this.driver.quit();
//         }
//     })
// })

let dirname = new Date().toLocaleDateString();
let filename = new Date().toLocaleTimeString().replace(/:/g, '_');
console.log(dirname, filename);
let dirpath = path.join(getrootPath(), dirname);
if (!fs.existsSync(dirpath)) {
    mkdirp(dirpath);
}
