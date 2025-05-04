import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
    trim: true
  }
}, {
  timestamps: true
});

const Anime = mongoose.models.Anime || mongoose.model('Anime', animeSchema);

export default Anime;
