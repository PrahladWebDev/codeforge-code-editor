const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  language: { type: String, required: true, default: 'javascript' },
  code: { type: String, required: true, default: '// Start coding...' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);