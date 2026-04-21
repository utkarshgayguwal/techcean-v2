import express from 'express';
import Contact from '../models/Contact.js';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: 'Contact data not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create(req.body);
    } else {
      contact = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true, runValidators: true });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/messages/stats', protect, async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const newCount = await Message.countDocuments({ status: 'new' });
    const readCount = await Message.countDocuments({ status: 'read' });
    const repliedCount = await Message.countDocuments({ status: 'replied' });
    res.json({ total, new: newCount, read: readCount, replied: repliedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/messages/:id', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/messages/:id', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;