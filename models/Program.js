const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  customId: { type: String },
  title: { type: String, required: true },
  icon: { type: String, default: '🌱' },
  age: { type: String },
  badge: { type: String },
  badgeColor: { type: String, default: '#dc181b' },
  description: { type: String },
  features: { type: [String], default: [] },
  details: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Transform virtual id for compatibility
ProgramSchema.virtual('id').get(function() {
  return this.customId || this._id.toHexString();
});
ProgramSchema.set('toJSON', { virtuals: true });
ProgramSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Program', ProgramSchema);
