const mongoose = require('mongoose');
const userSchema = mongoose.Schema;

var user = new userSchema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin: {
        type: boolean,
        default: false
        }
    });

modules.export = mongoose.model('user',user);

