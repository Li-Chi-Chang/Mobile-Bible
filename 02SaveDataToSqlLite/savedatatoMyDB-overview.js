const databaseOps = require('./databaseOps')

let db = databaseOps.openDB('./../db/unv.db',(err) => {
    console.log('Connected to the unv database.')
})
//get all chapters info
databaseOps.readFile('../output/BibleChapters', (err,data)=>{
    if (err) throw err
    let BibleChapters = JSON.parse(data)

    //create a table of this chapter
    let create_sql = 'create table if not exists bibleChapter(chapterNumber,engAbbreviation,zh)'
    databaseOps.sqlCommand(db, create_sql, (err)=>{
    if (err) throw err
    })

    //using them to find text data
    BibleChapters.forEach(eachChapter =>{
        databaseOps.sqlCommand(db,'insert into bibleChapter values('+eachChapter.chapterNumber+',\"'+eachChapter.engAbbreviation+'\",\"'+eachChapter.zh+'\")',(err)=>{
            if (err) throw err
        })
    })
})
