let path = require('path');


let rootpath = path.resolve(__dirname);

console.log("rootpath:",rootpath,"rootpath.lastIndexOf(path.sep)",rootpath.lastIndexOf(path.sep))

let newpath=  rootpath.substring(0,rootpath.lastIndexOf(path.sep))

console.log("newpath",newpath)
