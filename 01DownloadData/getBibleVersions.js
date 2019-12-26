const crawingFunc = require('./crawingFunction')
require('dotenv').config()
//data
let BibleVersions = []
//functions
async function getVersions(url){
    crawingFunc.get(url, (data)=>{
        BibleVersions = JSON.parse(data).record
        crawingFunc.saveAsFile(process.env.OUTPUT+'BibleVersions', JSON.stringify(BibleVersions),(err)=>{
            if (err) throw err
            console.log("BibleVersions outputed")
        })
    })
}
//get names of all versions
let url = "http://bible.fhl.net/json/ab.php"
getVersions(url)
