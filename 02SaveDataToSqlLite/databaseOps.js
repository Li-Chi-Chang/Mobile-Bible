const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

exports.openDB = function (path, callback) {
    let db = new sqlite3.Database(path, (err) => {
        if (err) throw err
        callback(err)
    })
    return db
}
exports.sqlCommand = function ( db, sqlCommand, callback) {
    db.run(sqlCommand, (err)=>{
        callback(err)
    })
}
exports.readFile = function (path, callback){
    fs.readFile(path, 'utf-8', (err,data)=>{
        callback(err,data)
    })
}