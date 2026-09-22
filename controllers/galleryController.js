const Gallery = require('../models/Gallery');

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Server error fetching gallery items' });
  }
};

// Create a gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    const newItem = new Gallery({ image });
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

// Reorder gallery items
exports.reorderGalleryItems = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items array is required' });
    }
    
    const updatePromises = items.map(item => 
      Gallery.findByIdAndUpdate(item._id, { order: item.order })
    );
    
    await Promise.all(updatePromises);
    
    res.json({ message: 'Gallery items reordered successfully' });
  } catch (error) {
    console.error('Error reordering gallery items:', error);
    res.status(500).json({ error: 'Server error reordering gallery items' });
  }
};
