const Journal = require('../models/Journal');

exports.getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching journals' });
  }
};

exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json(journal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching journal details' });
  }
};

exports.createJournal = async (req, res) => {
  try {
    const { title, category, categoryColor, readTime, author, authorRole, summary, image, content, slug, tags, published } = req.body;
    
    if (!title || !category || !content) {
      return res.status(400).json({ message: 'Title, category, and content are required' });
    }

    const newJournal = new Journal({
      title,
      category,
      categoryColor,
      readTime,
      author,
      authorRole,
      summary,
      image,
      content,
      slug,
      tags,
      published
    });

    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating journal' });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const { title, category, categoryColor, readTime, author, authorRole, summary, image, content, slug, tags, published } = req.body;
    
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    if (title) journal.title = title;
    if (category) journal.category = category;
    if (categoryColor) journal.categoryColor = categoryColor;
    if (readTime) journal.readTime = readTime;
    if (author) journal.author = author;
    if (authorRole) journal.authorRole = authorRole;
    if (summary !== undefined) journal.summary = summary;
    if (image !== undefined) journal.image = image;
    if (content) journal.content = content;
    if (slug !== undefined) journal.slug = slug;
    if (tags !== undefined) journal.tags = tags;
    if (published !== undefined) journal.published = published;

    const updatedJournal = await journal.save();
    res.json(updatedJournal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating journal' });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const result = await Journal.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json({ message: 'Journal deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting journal' });
  }
};
