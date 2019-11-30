const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcModel = new Schema({
    odnumpe: { type: String, required: true},
    odaubur: { type: Boolean, required: false},
    odaucom: { type: Boolean, required: false }
},{collection:'bc'});

module.exports = mongoose.model('Buro', bcModel);