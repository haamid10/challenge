const express = require('express');
const app = express()

app.use(express.json())

const todos = require('./todos');


app.get('/users' ,(req,res)=> {

  res.status(200).json({messege: todos})

});

app.get('/users/:id' ,(req,res)=> {

  const result = todos.find((item)=> item.id == req.params.id)

  res.status(200).json({messege: result})

});

app.post('/users/login/' ,(req,res)=> {

  const {email , password } = req.body
  // find user
  const result = todos.find((item)=> item.email == email && item.password == password)
// check-out
  if(!result){
    res.send('something is wrong')
  }
  // authenticated
  res.json({messege:"user authenticated "})
});
app.post('/users/register/',(req,res) => {
  const {email , password, confirmPass } = req.body
  // find email exists
  const existing = todos.find((item)=> item.email == email)
  if(existing){
    res.status(200).json('email already exists')
  }
  
  const id = todos[todos.length=== 0] ? 1 : todos[todos.length-1].id+1;
  const newUser = {
    id: id,
    email: email ,
    password: password
  }
  todos.push(newUser)
  res.json("aded new user")
})

app.put('/users/:id' ,(req,res)=> {
  const updated = todos.findIndex((item)=> item.id == req.params.id)
  if(updated === -1){
    res.status(404).json({messege: 'user  not found'})
  }
  const editTodo=(todos[updated].email = req.body.email)
  res.status(200).json({messege: 'user updated succesfuly'})
});


app.delete('/users/:id' ,(req,res)=> {

  const deletev= todos.findIndex((item)=> item.id == req.params.id)

  if(deletev === -1){
    res.status(404).json({messege: 'user  not found'})
  }
const result = todos.splice(deletev,1)
  res.status(200).json({messege:  'user is deleted'})
});

const port = 8080
app.listen(port , ()=> {
  console.log(`server is running on port ${port}`)
})

