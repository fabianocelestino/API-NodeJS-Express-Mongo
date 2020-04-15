const mongoose = require('mongoose')

mongoose.connect('mongodb://<username>:<password>@server/noderest?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  
})
mongoose.Promise = global.Promise

module.exports = mongoose

