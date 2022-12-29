import {Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

// 范例①：假设行程
const schedules = [
    {id:0, title:'First schedule', datatime:'2020-04-04T20:30', body:'Flight XXXX is on time with China Southern Airlines'},
    {id:1, title:'Second schedule', datatime:'2020-04-05T00:00', body:'Arrive at Wuhan Airport, pick up luggage, go to hotel'}
];

const router = new Router();

router.get('/',list )
    .get('/schedule/new', add)
    .get('/schedule/:id', show)
    .post('/schedule', create);  

    const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
    ctx.response.body = await render.list(schedules);
}

async function add(ctx) {
    ctx.response.body = await render.newschedule();
}

async function show(ctx) {
    const id = ctx.params.id;
    const schedule = schedules[id];
    if (!schedule) ctx.throw(404, 'invalid schedule id');
    ctx.response.body = await render.show(schedule);
  }
  
  async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      const schedule = {}
      for (const [key, value] of pairs) {
        schedule[key] = value
      }
      console.log('schedule=', schedule)
      const id = schedules.push(schedule) - 1;
      schedule.created_at = new Date();
      schedule.id = id;
      ctx.response.redirect('/');
    }
  }
  

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });