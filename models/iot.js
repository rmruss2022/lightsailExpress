const mongoose = require('mongoose')

const iotSchema = new mongoose.Schema({
    iot_type : {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('iot', iotSchema)