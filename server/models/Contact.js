import mongoose from 'mongoose';

const ContactInfoSchema = new mongoose.Schema({
  label: String,
  value: String,
  icon: String
}, { _id: false });

const SocialSchema = new mongoose.Schema({
  name: String,
  href: String,
  icon: String
}, { _id: false });

const ContactSchema = new mongoose.Schema({
  contacts: [ContactInfoSchema],
  socials: [SocialSchema]
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;