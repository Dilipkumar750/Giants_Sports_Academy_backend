const mongoose = require('mongoose');

const LeadershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  initials: { type: String },
  image: { type: String, default: '' }, // base64 or URL
  bio: { type: String },
  gradient: { type: String, default: 'from-[#dc181b] to-[#991113]' },
  accentColor: { type: String, default: '#dc181b' }
}, { timestamps: true });

module.exports = mongoose.model('Leadership', LeadershipSchema);
