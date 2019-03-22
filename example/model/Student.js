const mongoose = require('mongoose')

const Student = new mongoose.Schema({
  firstName: { type:String, trim:true, default:'' },
  lastName: { type:String, trim:true, default:'' },
  email: { type:String, trim:true, default:'' },
  address: { type:String, trim:true, default:'' },
  number: { type:Number, default:0 }
})

module.exports = mongoose.model('Student', Student)