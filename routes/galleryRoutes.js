const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// GET all gallery items
router.get('/', galleryController.getAllGalleryItems);

// POST a new gallery item
router.post('/', galleryController.createGalleryItem);

// DELETE a gallery item
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;
