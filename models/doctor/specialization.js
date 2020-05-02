const mongoose = require('mongoose');
const schema = mongoose.Schema;

var specialization = new schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Specialization', specialization)