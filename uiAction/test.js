// let path = require('path');


// let rootpath = path.resolve(__dirname);

// console.log("rootpath:",rootpath,"rootpath.lastIndexOf(path.sep)",rootpath.lastIndexOf(path.sep))

// let newpath=  rootpath.substring(0,rootpath.lastIndexOf(path.sep))

// console.log("newpath",newpath)

let userinfos = {
    a1: { username: "xiaoming", age: 13 },
    a2: { username: "xiaohong", age: 15 }
}

// console.log(userinfos.a1.username,userinfos.a1.age)

for (let key in userinfos){
    // console.log(key,"====>",userinfos[key])
    for(let k in userinfos[key] ){
        console.log(key,"====>",k,"----",userinfos[key][k])
    }
}