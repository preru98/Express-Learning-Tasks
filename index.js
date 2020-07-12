const express = require('express')
const http = require('http')
const morgan =  require('morgan')
const bodyParser = require('body-parser')

const port = 3000
const hostname = 'localhost' 

const app = express()   //Creates an Express application. It is a top-level function exported by the express module.

app.use(morgan('dev'))
app.use(bodyParser.json())


// dishes
app.all('/dishes', (req, res, next)=>{
    res.statusCode=200
    res.setHeader('Content-Type', 'text/plain')
    next()
})

app.get('/dishes', (req, res, next)=>{
    res.end("Will send all dishes")
})

app.post('/dishes', (req, res, next)=>{
    res.end("Will add dish "+ req.body.name + " " + req.body.description)
})

app.put('/dishes', (req, res, next)=>{
    res.statusCode=403
    res.end("PUT operation not supported")
})

app.delete('/dishes', (req, res, next)=>{
    res.end("All dishes will be deleted")
})


//dishes/:dishId
app.get('/dishes/:dishId', (req, res, next)=>{
    res.end("Will send dish with Id " + req.params.dishId)
})

app.post('/dishes/:dishId', (req, res, next)=>{
    res.statusCode=403
    res.end("POST operation not supported")
})

app.put('/dishes/:dishId', (req, res, next)=>{
    res.write("Updating the dish "+ req.params.dishId)
    res.end("Will update the dish as " + req.body.name + " " + req.body.description)
})

app.delete('/dishes/:dishId', (req, res, next)=>{
    res.end("Dish "+ req.params.dishId + "will be deleted")
})


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