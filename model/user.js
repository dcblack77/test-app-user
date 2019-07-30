const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Name is require']
  },
  email: {
    type:String,
    unique: true,
    require: [true, 'Email is require']
  },
  avatar:{
    type: String,
    require: false
  },
  password: {
    type: String,
    require:[true, 'The password is require']
  }
})



module.exports = mongoose.model( 'Users', userSchema);
