fs = require("fs");
path = require("path");
let types = {
    media: ["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','odt','odp','odg','odf','txt','ps','ps','tex',"pptx"],
    images:['png','jpeg','jpg'],
    links: ['lnk'],
    app: ['exe','dmg','pkg','deb']
}
function organizeFn(dirPath){


    // console.log("Tree command implementd for ",dirPath);
    //1. input->directory path given
    //2. create-> organized_files -> directory
    //3. identify categories of all the files present in that input directory
    //4. copy / cut files to that organized directory inside of any of category floder 
    let destPath;
    if(dirPath==undefined){
        // console.log("kindly entered the path");
        destPath = process.cwd()
    }
   
    else{
        let doesExitst = fs.existsSync(dirPath)
        if(doesExitst)
        {
            //create a organized files directory
             destPath = path.join(dirPath,"organized files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath)
            }
            
        }
        else{
            console.log("kindly enter the correct path");
        }

    }
    organizeHelper(dirPath,destPath);
}

function organizeHelper(src, dest){
    //identify categories of all the files present in that input directory
    let childFiles = fs.readdirSync(src)
    // console.log(childFiles);
    for(let i = 0;i<childFiles.length;i++){
        let childAddress = path.join(src,childFiles[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childFiles[i]);
            let category = getCategory(childFiles[i]);
            // console.log(childFiles[i]," belogs to -> ",category);
            sendFiles(childAddress,dest,category)

        }
    }


}

function sendFiles(childAddress,dest,category){
    let categoryPath = path.join(dest,category)
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(childAddress)
    let destFilePath = path.join(categoryPath,fileName)
    fs.copyFileSync(childAddress, destFilePath)
    fs.unlinkSync(childAddress)
    console.log(fileName,"copied to ",category);
}

function getCategory(name){
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);
    // console.log(ext);
    //loop to get the extension match from type object
    for(let type in types){
        let cTypeArray = types[type];
        for(let i =0;i<cTypeArray.length;i++){
            if(ext== cTypeArray[i]){
                return type;
            }

        }
        

    }
    return "others";
}


module.exports = {
    organizeKey: organizeFn
}