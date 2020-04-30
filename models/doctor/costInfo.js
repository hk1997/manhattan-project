const mongoose = require('mongoose')
const schema = mongoose, schema

var costInfo = new schema({
    virtualCall: {
        type: String
    },
    physicalExamination: {
        type: String
    },
    emergencycharges: {
        types: String
    }
})

module.exports = mongoose.model('CostInfo', costInfo)