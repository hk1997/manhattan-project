const mongoose = require('mongoose')
const Schema = mongoose.Schema

var doctorInfo = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    name: {
        type: String
    },
    qualifications: {
        type: [{
            type: { type: String },
            college: { type: String },
            passoutYear: { type: String },
        }]
    },
    clinic: {
        type: [{
            name: { type: String },
            address: { type: String },
            phoneNo: { type: String },
            city: { type: String },
            state: { type: String }
        }]
    },
    specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialization"
    },
    profileImage: {
        type: String
    }
})


module.exports = mongoose.model('DoctorInfo', doctorInfo)