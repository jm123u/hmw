import { DB } from "https://deno.land/x/sqlite/mod.ts";

try {
    Deno.remove("hwdb.db")
} catch (e) {
    console.log ('remove fail!')
}
var db = new DB ("hwdb.db")
db.query("CREATE TABLE studentid (studentid TEXT, studentname TEXT)");
db.query("CREATE TABLE msgs (msg TEXT, user TEXT)");

var student_id =[
    ["11111111","jams" ],
    ["22222222","paul" ],
]
    for (var [studentid,studentname] of student_id )
    db.query("INSERT INTO student (studentid, studentname) VALUES (?,?)",studentid,studentname);


    for (var [studentid,studentname] of db.query("SELECT studentid, studentname FROM studentname"))
    console.log(studentid,studentname);


    let r = db.query(`SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'`)
    console.log('r=', r)
db.close();