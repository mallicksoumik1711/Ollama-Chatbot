const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Chat', chatSchema)
