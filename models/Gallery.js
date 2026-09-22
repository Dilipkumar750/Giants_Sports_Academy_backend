const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  order: { type: Number, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
