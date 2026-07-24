const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  categoryColor: { type: String, default: '#dc181b' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  readTime: { type: String, default: '5 min read' },
  author: { type: String, default: 'Admin' },
  authorRole: { type: String, default: 'Editor' },
  summary: { type: String },
  image: { type: String },
  content: { type: String, required: true },
  slug: { type: String },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Journal', JournalSchema);
