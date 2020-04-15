const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request, response)=>{
  response.json({ok: true})
})

require('./controllers/authController')(app)

app.listen(3000)