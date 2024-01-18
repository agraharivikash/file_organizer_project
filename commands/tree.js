fs = require("fs");
path = require("path");
function treeFn(dirPath){
    // console.log("Tree command implementd for ",dirPath);
    // let destPath;
    if(dirPath==undefined){
        // console.log("Kindly enter the path");
        treeHelper(process.cwd(),"")
        return;
    }
    else{
        let doesExitst = fs.existsSync(dirPath)
        if(dirPath){
            treeHelper(dirPath , "");
        }
        else{
            console.log("kindly enter the right path");
            return;
        }
    }
}


function treeHelper(dirPath,indent){
    //cheak for files or floders
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName = path.basename(dirPath)
        console.log(indent +" |--> ",fileName);
    }
    else {
        let dirName = path.basename(dirPath)
        console.log(indent + " '--> ",dirName);
        let children = fs.readFileSync(dirPath);
        for(let i =0;i<children.length;i++){
            let childernPath = path.join(dirName,children);
            treeHelper(childernPath,indent + "\t")
        }
    }

}

module.exports = {
    treeKey: treeFn
}