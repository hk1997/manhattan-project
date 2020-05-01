const mongoose = require('mongoose')
const schema = mongoose.schema

var prescription = new schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    date: {
        type: String
    },
    imageUrl: {
        type: String
    },
    documentLink: {
        type: String
    }
})

module.exports = mongoose.schema('Prescription', prescription)