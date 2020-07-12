const express = require('express')
const http = require('http')
const morgan =  require('morgan')

const port = 3000
const hostname = 'localhost' 

const app = express()   //Creates an Express application. It is a top-level function exported by the express module.

app.use(morgan('dev'))

app.use(express.static(__dirname + '/public')) // This will serve up files accordingly, this is enough

app.use((req, res, next)=>{                    // This will be default behaviour if above implementation doesn't work due to errors
    console.log(req.headers)                   //Not necessary

    res.setHeader('Content-Type', 'text/html')
    res.statusCode=200
    res.end('<html><body><h2>Express Server</h2></body></html>')
})

var server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})