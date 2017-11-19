let path = require('path');
let fs = require('fs');
let getImageFilesPath = function () {
    return path.join(getrootPath(),"imagefiles");
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
// console.log(getrootPath());
// console.log(getImageFilesPath());

module.exports.getrootPath = getrootPath;
module.exports.getImageFilesPath = getImageFilesPath;

