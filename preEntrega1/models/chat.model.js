const {Schema, model} = require('mongoose')

const schema = new Schema ({
    user: String,
    text: String,
    detetime: String
})

const chatMessageModel = model ('messages', schema)

module.exports = chatMessageModel