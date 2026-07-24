const Leadership = require('../models/Leadership');

exports.getAllLeadership = async (req, res) => {
  try {
    const team = await Leadership.find();
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching leadership data' });
  }
};

exports.createLeadership = async (req, res) => {
  try {
    const { name, role, initials, bio, gradient, accentColor, image } = req.body;
    
    if (!name || !role) {
      return res.status(400).json({ message: 'Name and role are required' });
    }

    const newMember = new Leadership({
      name,
      role,
      initials: initials || name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      bio,
      gradient,
      accentColor,
      image: image || ''
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating leadership record' });
  }
};

exports.updateLeadership = async (req, res) => {
  try {
    const { name, role, initials, bio, gradient, accentColor, image } = req.body;
    
    const member = await Leadership.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Leadership record not found' });
    }

    if (name) member.name = name;
    if (role) member.role = role;
    if (initials !== undefined) member.initials = initials;
    if (bio !== undefined) member.bio = bio;
    if (gradient) member.gradient = gradient;
    if (accentColor) member.accentColor = accentColor;
    // Always update image (even empty string means photo was removed)
    member.image = image !== undefined ? image : member.image;

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating leadership record' });
  }
};

exports.deleteLeadership = async (req, res) => {
  try {
    const result = await Leadership.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Leadership record not found' });
    }
    res.json({ message: 'Leadership record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting leadership record' });
  }
};
