const Program = require('../models/Program');

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching programs' });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const { customId, title, icon, age, badge, badgeColor, description, features, details, featured } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Program title is required' });
    }

    const newProgram = new Program({
      customId: customId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      icon,
      age,
      badge,
      badgeColor,
      description,
      features,
      details,
      featured: !!featured
    });

    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating program' });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { customId, title, icon, age, badge, badgeColor, description, features, details, featured } = req.body;
    
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    if (customId) program.customId = customId;
    if (title) program.title = title;
    if (icon) program.icon = icon;
    if (age) program.age = age;
    if (badge) program.badge = badge;
    if (badgeColor) program.badgeColor = badgeColor;
    if (description) program.description = description;
    if (features) program.features = features;
    if (details) program.details = details;
    if (featured !== undefined) program.featured = !!featured;

    const updatedProgram = await program.save();
    res.json(updatedProgram);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating program' });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const result = await Program.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json({ message: 'Program deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting program' });
  }
};
