const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   Name: { type: String, required: true },
   Email: { type: String, required: true, unique: true },
   Password: { type: String, required: true },
   Mobile_No: { type: String, required: true, unique: true }

}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)
