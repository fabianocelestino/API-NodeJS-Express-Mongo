const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:12345@cluster0-nnb0w.mongodb.net/noderest?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  
})
mongoose.Promise = global.Promise

module.exports = mongoose

