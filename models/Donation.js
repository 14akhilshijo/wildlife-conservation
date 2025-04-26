const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },  // Ensure this is present
    project: { type: String, required: true }  // Assuming you have a project field
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
