const mongoose = require('mongoose')
const Schema = mongoose.Schema

var doctorAuth = new Schema({
    phone: {
        type: String
    },
})

doctorAuth.statics.upsertPhoneUser = function (phoneNo) {
    return new Promise((resolve, reject) => {
        var that = this
        this.findOne({ phone: phoneNo }, (err, user) => {
            if (err)
                resolve({ success: false, message: err, data: {} })
            else if (user) {
                resolve({ success: true, message: "Phone No already exists", data: { user: user } })
            }
            else {
                let newUser = new that({
                    'phone': phoneNo
                })

                newUser.save((err, savedUser) => {
                    if (err) {
                        resolve({ success: false, message: err, data: {} })
                    }
                    else {
                        resolve({ success: true, message: 'Registration successful', data: { user: savedUser } })
                    }
                })
            }
        })
    })
}

module.exports = mongoose.model('Doctor', doctorAuth)