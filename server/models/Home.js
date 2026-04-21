import mongoose from 'mongoose';

const StackItemSchema = new mongoose.Schema({
  icon: String,
  name: String
}, { _id: false });

const CategoryStackSchema = new mongoose.Schema({
  Frontend: [StackItemSchema],
  Backend: [StackItemSchema],
  AI: [StackItemSchema],
  Cloud: [StackItemSchema]
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  q: String,
  name: String,
  role: String,
  init: String,
  color: String
}, { _id: false });

const StatSchema = new mongoose.Schema({
  value: String,
  label: String
}, { _id: false });

const HomeSchema = new mongoose.Schema({
  stack: CategoryStackSchema,
  testimonials: [TestimonialSchema],
  stats: [StatSchema]
}, { timestamps: true });

const Home = mongoose.model('Home', HomeSchema);

export default Home;