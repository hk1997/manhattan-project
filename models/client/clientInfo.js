const mongoose = require('mongoose')
const schema = mongoose.schema

var clientinfo = new schema({
    name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    }
})

module.exports = mongoos.schema('ClientInfo', clientinfo)