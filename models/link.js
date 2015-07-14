var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    Link = new Schema({
        fullValue: {
            type: String,
            required: true
        },
        shortValue: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            required: false
        },
        hopCount: {
            type: Number,
            required: false/*,
            default: 0*/
        },
        userId: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Link', Link);