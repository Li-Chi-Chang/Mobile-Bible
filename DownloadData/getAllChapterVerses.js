const crawingFunc = require('./crawingFunction')
const fs = require('fs')
require('dotenv').config()

let BibleChapters = []
//get data from our source
async function getVerses(url, version, zh){
    crawingFunc.readFile(process.env.OUTPUT+'/BibleChapters',(err,data)=>{
        if (err) throw err
        BibleChapters = JSON.parse(data)
    
        BibleChapters.forEach(eachChapter => {
            crawingFunc.get(encodeURI(url+"?chineses="+eachChapter.zhAbbreviation+"&version="+version+"&gb="+zh),(data)=>{
                let allVersesInAChapter = JSON.parse(data)
                let verses = []
                let chapter = 1
                let prevVers = 0
                for(let i = 0; i < allVersesInAChapter.record_count; i++){
                    if(prevVers<allVersesInAChapter.record[i].sec){
                        prevVers = allVersesInAChapter.record[i].sec
                    }
                    else{
                        prevVers = 0
                        chapter++
                    }
                    verses.push({chapter:chapter,verse:allVersesInAChapter.record[i].sec,text:allVersesInAChapter.record[i].bible_text})
                }
                crawingFunc.makeFolder(process.env.OUTPUT+"Bible/" + version,()=>{
                    crawingFunc.saveAsFile(process.env.OUTPUT+"Bible/" + version + "/" + eachChapter.chapterNumber + eachChapter.zhAbbreviation,JSON.stringify(verses),(err)=>{
                        if (err) throw err
                        console.log("finished " + eachChapter.zhAbbreviation)
                    })
                })
            })
        })
    })
}

//get all verses
let url = "http://bible.fhl.net/json/qb.php"
//getVerses(url,"unv",0)

crawingFunc.readFile(process.env.OUTPUT+'BibleVersions',(err,data)=>{
    if (err) throw err
    let BibleVersions = JSON.parse(data)
    BibleVersions.forEach(element => {
        if(element.cname != "")
            getVerses(url,element.book, 0)
    })
})