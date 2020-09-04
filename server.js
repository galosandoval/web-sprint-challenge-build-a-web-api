const express = require('express')
const server = express()
const helmet = require('helmet')
const actionsRouter = require('./actions/actionsRouter')
const projectsRouter = require('./projects/projectsRouter')

server.use(express.json())
server.use(helmet())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server