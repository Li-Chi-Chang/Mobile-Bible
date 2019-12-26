const crawingFunc = require('./crawingFunction')
require('dotenv').config()
//data
let BibleChapters = []
//functions
async function getChapters(url){
    crawingFunc.get(url, (data)=>{
        //it is CSV data structure, cut it by newline mark
        let datalist = data.split('\n')
        for(let i = 0; i < datalist.length - 1; i++){
            //cut data into details
            let datadetail = datalist[i].split(',')
            let jsonFromat = {chapterNumber:datadetail[0],engAbbreviation:datadetail[1],eng:datadetail[2],zhAbbreviation:datadetail[3],zh:datadetail[4],engAbbreviationSimplified:datadetail[5]}
            BibleChapters.push(jsonFromat)
        }
        crawingFunc.saveAsFile(process.env.OUTPUT+"BibleChapters",JSON.stringify(BibleChapters),(err)=>{
            if (err) throw err
            console.log("BibleChapters outputed")
        })
    })
}
//get names of all chapters
let url = "http://bible.fhl.net/json/listall.html"
getChapters(url)
