const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const leadershipRoutes = require('./routes/leadershipRoutes');
const programRoutes = require('./routes/programRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Giants Sports API running smoothly' });
});

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Seed Data
const mongoUri = process.env.MONGODB_URI || process.env.mongoDb || 'mongodb://127.0.0.1:27017/giants_sports';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB successfully connected.');

    // Seed initial data if database is empty
    await seedDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Seeding logic
async function seedDatabase() {
  try {
    const User = require('./models/User');
    const Journal = require('./models/Journal');
    const Leadership = require('./models/Leadership');
    const Program = require('./models/Program');
    const Testimonial = require('./models/Testimonial');
    const seedData = require('./seedData');

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      console.log('Seeding default administrator credentials...');
      const admin = new User({
        username: 'admin',
        password: 'admin123' // This will be hashed by pre-save hook
      });
      await admin.save();
      console.log('--------------------------------------------------');
      console.log('DEFAULT ADMIN CREATED:');
      console.log('Username: admin');
      console.log('Password: admin123');
      console.log('--------------------------------------------------');
    }

    // 2. Seed Journals
    const journalCount = await Journal.countDocuments();
    if (journalCount === 0) {
      console.log('Seeding default journal articles...');
      await Journal.insertMany(seedData.journals);
      console.log(`Seeded ${seedData.journals.length} journal articles.`);
    }

    // 3. Seed Leadership
    const leadershipCount = await Leadership.countDocuments();
    if (leadershipCount === 0) {
      console.log('Seeding default leadership team members...');
      await Leadership.insertMany(seedData.leadership);
      console.log(`Seeded ${seedData.leadership.length} board members.`);
    }

    // 4. Seed / Sync Programs (Ensure all 6 official programs are present)
    const existingPrograms = await Program.find();
    const hasOldPrograms = existingPrograms.some(p => ['grassroots', 'elite', 'champions'].includes(p.customId));
    if (existingPrograms.length === 0 || hasOldPrograms || existingPrograms.length < 6) {
      console.log('Syncing all 6 official training programs to database...');
      for (const prog of seedData.programs) {
        await Program.findOneAndUpdate(
          { customId: prog.customId },
          { $set: prog },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
      // Remove deprecated placeholder programs if present
      await Program.deleteMany({ customId: { $in: ['grassroots', 'elite', 'champions'] } });
      console.log('Successfully synced 6 official programs in database.');
    }

    // 5. Seed Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      console.log('Seeding default testimonials...');
      await Testimonial.insertMany(seedData.testimonials);
      console.log(`Seeded ${seedData.testimonials.length} reviews.`);
    }
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}
