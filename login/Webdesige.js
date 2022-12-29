import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <title>
    login and home
  </title>
  <style>
  body {
    background-color: lightblue;
}
    h1{
      color: MediumSeaGreen; 
      text-align: center
      text
    } 
    
    h2{
      color: black; 
      text-align: center
    }
    
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")){
      ctx.response.body = page(`
          <h1>login</h1>
          <form action="" method="post">
          <h2>使用者姓名</h2> 
          <br>
              <input type="text" name="user" value="" placeholder="User Name"/>
              <h2>使用者密码</h2> 
              <br>
              <input type="pwd" name="pwd" value="" placeholder="Pwd"/>
              <input type="button" name="submit" value="Submit"/>
          </form>
      `)
  }
  else{
      ctx.response.body = page(`
          <h1>home</h1>
          <a href="http://127.0.0.1:8000/login">LOGIN</a>
      `)
  }
// searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });