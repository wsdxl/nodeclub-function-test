let path = require('path');
let fs = require('fs');
let date=new Date().toLocaleDateString();

let getImageFilesPath = function () {
    return path.join(getrootPath(),"imagefiles");
}
let getScreenshotsPath = function () {
    return path.join(getrootPath(),date);
}

let getrootPath = function () {
    let rootpath = path.resolve(__dirname);
    while (rootpath) {
        if (fs.existsSync(path.join(rootpath,'package.json'))) {
            break;
        }
        rootpath = rootpath.substring(0, rootpath.lastIndexOf(path.sep));
    }
    return rootpath;
}
console.log(getrootPath());
console.log(getScreenshotsPath());

module.exports.getrootPath = getrootPath;
module.exports.getImageFilesPath = getImageFilesPath;
module.exports.getScreenshotsPath=getScreenshotsPath;
