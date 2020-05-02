const mongoose = require('mongoose')
const schema = mongoose.Schema

var paymentInfo = new schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    bankDetails: {
        type: {
            accountNo: {
                type: String
            },
            ifscCode: {
                type: String
            }
        }
    }
})

module.exports = mongoose.model('PaymentInfo', paymentInfo)