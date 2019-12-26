const http = require('http')
const fs = require('fs')

exports.get = function (url, callback){
    http.get(url, (response)=>{
        let buff = ''
        response.on('data', (chunk) => {
            buff += chunk
        })
    
        response.on('end', () => {
            callback(buff)
        })
    })
}
exports.saveAsFile = function (path,data,callback){
    fs.writeFile(path,data,(err)=>{
        callback(err)
    })
}
exports.readFile = function (path, callback){
    fs.readFile(path, 'utf-8', (err,data)=>{
        callback(err,data)
    })
}
exports.makeFolder = function (path, callback){
    fs.mkdir(path, ()=>{
        callback()
    })
}