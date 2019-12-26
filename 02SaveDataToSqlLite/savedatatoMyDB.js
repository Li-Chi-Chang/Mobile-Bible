const sql = require('sql.js')

sql().then(SQL=>{
    let db = new SQL.Database()
    sqlstr = "CREATE TABLE hello (a int, b char);"
    sqlstr += "INSERT INTO hello VALUES (0, 'hello');"
    sqlstr += "INSERT INTO hello VALUES (1, 'world');"
    db.run(sqlstr); // Run the query without returning anything

    var res = db.exec("SELECT * FROM hello")
    var stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval")
    // Bind values to the parameters and fetch the results of the query
    var result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'})
    console.log(result) // Will print {a:1, b:'world'}
})
