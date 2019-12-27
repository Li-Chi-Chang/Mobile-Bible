const databaseOps = require('./databaseOps')

let db = databaseOps.openDB('./../db/unv.db',(err) => {
    console.log('Connected to the unv database.')
})
//get all chapters info
databaseOps.readFile('../output/BibleChapters', (err,data)=>{
    if (err) throw err
    let BibleChapters = JSON.parse(data)

    //create a table of this chapter
    let create_sql = 'create table if not exists bibleText(chapterNumber,engAbbreviation,chapter,verse,text)'
    databaseOps.sqlCommand(db, create_sql, (err)=>{
    if (err) throw err
    })

    //using them to find text data
    BibleChapters.forEach(eachChapter =>{
        databaseOps.readFile('../output/Bible/unv/'+eachChapter.chapterNumber+eachChapter.zhAbbreviation, (err,Versedata)=>{
            if (err) throw err
            let chapterData = JSON.parse(Versedata)

            chapterData.forEach(eachVerse =>{
                let verseData = eachVerse
                let insert_sql = 'insert into bibleText values('+eachChapter.chapterNumber+',\"'+eachChapter.engAbbreviation+'\",'+verseData.chapter+','+verseData.verse+',\"'+verseData.text+'\")'
                databaseOps.sqlCommand(db, insert_sql, (err)=>{
                    if (err) throw err
                })
            })
        })
    })
})



/*db.close((err) => {
    if (err) throw err
    console.log('Close the database connection.')
})
*/
