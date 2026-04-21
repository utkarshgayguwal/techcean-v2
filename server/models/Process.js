import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  num: String,
  phase: String,
  title: String,
  icon: String,
  color: String,
  duration: String,
  desc: String,
  details: [String],
  deliverable: String
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  q: String,
  a: String
}, { _id: false });

const ToolSchema = new mongoose.Schema({
  icon: String,
  label: String,
  color: String
}, { _id: false });

const ProcessSchema = new mongoose.Schema({
  steps: [StepSchema],
  faqs: [FAQSchema],
  tools: [ToolSchema]
}, { timestamps: true });

const Process = mongoose.model('Process', ProcessSchema);

export default Process;