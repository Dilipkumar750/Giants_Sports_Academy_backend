const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String },
  sport: { type: String },
  achievement: { type: String },
  rating: { type: Number, default: 5 },
  quote: { type: String, required: true },
  avatar: { type: String, default: 'G' },
  date: { type: String },
  sportColor: { type: String, default: '#dc181b' }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
