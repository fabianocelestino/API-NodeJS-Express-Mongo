const express = require('express')
const User = require('../models/user')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

const router = express.Router()

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })  
}

router.post('/register', async (request, response)=>{
  const {email} =  request.body

  
  try{
    if(await User.findOne({email})){
      return response.status(400).send({ error: "User already exists"})
    }

    const user = await User.create(request.body)
    user.password = undefined
    
    return response.send({user, token: generateToken({id: user.id})  })

  }catch(err){
    response.status(400).send({error: 'Registraton failed'})
  }
})

router.post('/authenticate', async (request, response)=>{
  const {email, password} = request.body
  
  // Criamos, em nosso model User, um cmapo para email com uma flag 'select: false. Contudo, para efefuarmos um login será necessário obter esse valor do DB. Faremos isso ao incluir o trecho .select('+password')'
  const user = await User.findOne({email}).select('+password')
  if(!user)
    response.status(400).send({error: "User not found"})
  
  if(! await bcrypt.compare(password, user.password))
    response.status(400).send({error: "Oops, there is sometring wrong that is not right"})

  user.password = undefined
 

  response.send({user, token: generateToken({id: user.id}) })
  
})

module.exports = app => app.use('/auth', router)