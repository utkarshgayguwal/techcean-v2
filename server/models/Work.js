import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: Number,
  cat: String,
  tag: String,
  title: String,
  desc: String,
  tags: [String],
  metric: String,
  metricLabel: String,
  year: String,
  client: String,
  color: String,
  accent: String,
  featured: Boolean
}, { _id: false });

const ProcessStepSchema = new mongoose.Schema({
  num: String,
  title: String,
  desc: String,
  icon: String
}, { _id: false });

const WorkTestimonialSchema = new mongoose.Schema({
  q: String,
  name: String,
  role: String,
  init: String,
  color: String
}, { _id: false });

const WorkSchema = new mongoose.Schema({
  categories: [String],
  projects: [ProjectSchema],
  processSteps: [ProcessStepSchema],
  testimonials: [WorkTestimonialSchema]
}, { timestamps: true });

const Work = mongoose.model('Work', WorkSchema);

export default Work;