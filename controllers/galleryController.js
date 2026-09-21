const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Server error fetching gallery items' });
  }
};

// Create a gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const { title, image } = req.body;
    
    if (!title || !image) {
      return res.status(400).json({ error: 'Title and image are required' });
    }
    
    const newItem = new Gallery({ title, image });
    await newItem.save();
    
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Server error creating gallery item' });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Server error deleting gallery item' });
  }
};
