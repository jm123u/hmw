export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
        }
    
        h1 {
          font-size: 2em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #schedules {
          margin: 0;
          padding: 0;
        }
    
        #schedules li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #schedules li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(schedules) {
    let list = []
    for (let schedule of schedules) {
      list.push(`
      <li>
        <h2>${ schedule.title }</h2>
        <p><a href="/schedule/${schedule.id}">Read schedule</a></p>
      </li>
      `)
    }
    let content = `
    <h1>schedules</h1>
    <p>You have <strong>${schedules.length}</strong> schedules!</p>
    <p><a href="/schedule/new">Create a schedule</a></p>
    <ul id="schedules">
      ${list.join('\n')}
    </ul>
    `
    return layout('schedules', content)
  }
  
  export function newschedule() {
    return layout('New schedule', `
    <h1>New schedule</h1>
    <p>Create a new schedule.</p>
    <form action="/schedule" method="schedule">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
  }
  
  export function show(schedule) {
    return layout(schedule.title, `
      <h1>${schedule.title}</h1>
      <pre>${schedule.body}</pre>
    `)
  }
  
  