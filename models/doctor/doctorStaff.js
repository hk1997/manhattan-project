const mongoose = require('mongoose')
const schema = mongoose.schema

var staffInfo = new schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    staffMembers: {
        type: [{
            staffId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Staff'
            }
        }]
    }
})

module.exports = mongoose.model('Doctorstaff', staffInfo)