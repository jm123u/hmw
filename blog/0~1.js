import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import {DB} from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");

const router = new Router();

router.get('/',list )
    .get('/schedule/new', add)
    .get('/schedule/:id', show)
    .post('/schedule', create);  

const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());

app.use(async (ctx) => {
    console.log('path=', ctx.request.url.pathname)
    if (ctx.request.url.pathname.starsWith("/public/")){
        console.log('pass:', ctx.request.url.pathname)
        await send (ctx, ctx.request.url.pathname,{
            root: DelayNode.cwd(),
            index:"index.html",
        })
    }
})

function query(sql){
    let list = []
    for (const[id, title, body] of db.query(sql)) {
        list.push({id, title, body})
    }
    return list
}

async function list(ctx){
    let posts = query('Select id, title, body from db')
    console.log('list: posts=', posts)
    ctx.response.body = await render.list(posts);
}

async function add(ctx){
    ctx.response.body = await render.newSchedule()
}

async function show(ctx){
    const id = ctx.params.id;
    const schedule = schedule[id];
    if (!schedule) ctx.throw(404, 'invalid schedule id')
    ctx.response.body = await render.show(schedule);        
}

async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "from") {
        const pairs = await body.value
        const schedule = {}
        for (const [key, value] of pairs) {
            schedule[key] = value
        }
        console.log('schedule=', schedule)
        const id = posts.push(post) - 1;
        post.created_at = new Date();
        post.id = id;
        ctx.response.redirect('/');
    }
}
    
console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });