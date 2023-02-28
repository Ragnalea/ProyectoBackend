const fs = require('fs')

const infoJson = fs.readFileSync("package.json","utf-8")
//console.log(infoJson)

const info ={
    contStr: infoJson,
    contJson: JSON.parse(infoJson),
    size: fs.statSync("package.json").size
}

console.log(info)

fs.promises.writeFile("Info.json",JSON.stringify(info))
.then(()=> console.log("Exitoso"))
.catch(error=> console.log(error))