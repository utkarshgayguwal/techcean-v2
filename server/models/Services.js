import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  feature: String
}, { _id: false });

const ServiceItemSchema = new mongoose.Schema({
  id: String,
  num: String,
  color: String,
  icon: String,
  title: String,
  short: String,
  desc: String,
  features: [String],
  tags: [String],
  deliverables: [String]
}, { _id: false });

const ServiceProcessSchema = new mongoose.Schema({
  num: String,
  title: String,
  desc: String
}, { _id: false });

const ServiceFAQSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const ServicesSchema = new mongoose.Schema({
  services: [ServiceItemSchema],
  process: [ServiceProcessSchema],
  faqs: [ServiceFAQSchema]
}, { timestamps: true });

const Services = mongoose.model('Services', ServicesSchema);

export default Services;