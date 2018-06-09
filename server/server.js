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
            res.send(doc)
        },
        (e) => {
            res.status(400).send(e)
        }
    )
})

app.get('/todos' , (req,res) =>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos/:id',(req,res) => {
    Todo.findById(req.params.id).then((todo)=>{
        const id = req.params.id
        if(!ObjectID.isValid(id)){
            res.status(404).send()
        }
        if(!todo) {
            res.status(400).send()
        }
        res.send({todo})
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})

module.exports = {app}