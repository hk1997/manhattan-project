const mongoose = require('mongoose')
const schema = mongoose.schema

var clientMeeting = new schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    dateTime: {
        type: String
    },
    status: {
        type: String
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    meetingLink: {
        type: String
    },
    prescription: {
        type: String
    }
})

module.exports = mongoose.schema('ClientMeeting', clientMeeting)