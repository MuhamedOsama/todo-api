const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc, e) => {
            return res.send(doc)
        },
        (e) => {
            return res.status(400).send(e)
        }
    )
})

app.get('/todos' , (req,res) =>{
    Todo.find().then((todos)=>{
        return res.send({todos})
    },(e)=>{
        return res.status(400).send(e)
    })
})

app.get('/todos/:id',(req,res) => {
    const id = req.params.id
    Todo.findById(id).then((todo)=>{
        if(!ObjectID.isValid(id)){
            return res.status(404).send()
        }
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e)=>{
        return res.status(400).send()
    })
})

app.delete('/todos/:id',(req,res)=>{
    const id = req.params.id
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!ObjectID.isValid(id)){
            return res.status(404).send()
        }
        if(!todo){
            return res.status(404).send()
        }
        return res.send({todo})
    }).catch((e)=>{
        return res.status(404).send()
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})

module.exports = {app}