/**
 * Created by Vadym on 25/12/14.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Player', {
    name: { type: String },
    points: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});