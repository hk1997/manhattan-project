const mongoose = require('mongoose')
const schema = mongoose.Schema

var costInfo = new schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    charges: {
        type: {
            virtualCall: {
                type: Number
            },
            physicalExamination: {
                type: Number
            },
            emergencyCharges: {
                types: Number
            }
        }
    }
})

module.exports = mongoose.model('CostInfo', costInfo)