import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

var db = new DB("hw1.db");
var app= new Application();
var router = new Router();

router.get('/', font_page)
.get ('/sqlcmd/:cmd', sqlcmd)
.get('/public/(.*)', public1)

app.use(router.routes());
app.use(router.allowedMethods())

db.query ("CREATE TABLE IF NOT EXISTS studentsname (id INTEGER PRIMARY KEY AUTOINCREMENT, studentname TEXT, text TEXT)")

db.query("DELETE FROM studentname WHERE studentname= 'jams'")

let sql = `INSERT INTO studentsname(id, name, text) VALUES (1,'jame','js','hola', 'jams')`;

db.query(sql);

// 下述為複製代碼
async function font_page(ctx) {

    ctx.response.redirect('/public/') 
}


async function public1(ctx) {

    await send(ctx, ctx.request.url.pathname, {

        root: `${Deno.cwd()}/`,
        index: "index_sm.html", 
    })

}

async function sqlcmd(ctx) {

    try {

        let cmd = ctx.params['cmd']
        let result = db.query(cmd)
        ctx.response.type = 'application/json'
        ctx.response.body = result

    }

    catch (err) {

        ctx.response.body = err.message;

    }

}

console.log('Server run at http://127.0.0.1:5000')
await app.listen({ port: 5000 })