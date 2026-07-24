const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching testimonials' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, location, sport, achievement, rating, quote, avatar, date, sportColor } = req.body;
    
    if (!name || !role || !quote) {
      return res.status(400).json({ message: 'Name, role, and quote are required' });
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      location,
      sport,
      achievement,
      rating: rating !== undefined ? Number(rating) : 5,
      quote,
      avatar: avatar || name.charAt(0).toUpperCase(),
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      sportColor
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating testimonial' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { name, role, location, sport, achievement, rating, quote, avatar, date, sportColor } = req.body;
    
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (name) testimonial.name = name;
    if (role) testimonial.role = role;
    if (location !== undefined) testimonial.location = location;
    if (sport !== undefined) testimonial.sport = sport;
    if (achievement !== undefined) testimonial.achievement = achievement;
    if (rating !== undefined) testimonial.rating = Number(rating);
    if (quote) testimonial.quote = quote;
    if (avatar) testimonial.avatar = avatar;
    if (date) testimonial.date = date;
    if (sportColor) testimonial.sportColor = sportColor;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating testimonial' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const result = await Testimonial.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting testimonial' });
  }
};
