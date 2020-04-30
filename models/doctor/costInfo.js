const mongoose = require('mongoose')
const schema = mongoose, schema

var costInfo = new schema({
    virtualCall: {
        type: Number
    },
    physicalExamination: {
        type: Number
    },
    emergencycharges: {
        types: Number
    }
})

module.exports = mongoose.model('CostInfo', costInfo)