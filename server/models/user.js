let mongoose = require('mongoose')

let User = mongoose.model('User', {
    name: {
        type :String,
        require:true,
        trim:true,
        minlength:1
    },
    email: {
        type:String,
        require:true,
        minlength:true,
        trim:true,
        unique:true
    }
})


module.exports = {User}