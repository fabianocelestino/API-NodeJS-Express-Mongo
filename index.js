const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
//app.use(bodyParser.urlencoded({extended: true}))

/*app.get('/', (request, response)=>{
  response.send({ok: false})
})*/

require('./controllers/authController')(app)
require('./controllers/projectController')(app)


app.listen(3000)