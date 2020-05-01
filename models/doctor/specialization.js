const mongoose = require('mongoose')
const schema = mongoose.schema

var specialization = new schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('Specialization', specialization)