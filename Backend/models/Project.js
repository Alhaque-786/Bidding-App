const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    bids:  [{user: String, amount: Number}],
    isActive: Boolean,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;