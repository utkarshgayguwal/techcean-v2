import express from 'express';
import Services from '../models/Services.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let services = await Services.findOne();
    if (!services) {
      return res.status(404).json({ message: 'Services data not found' });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const services = await Services.create(req.body);
    res.status(201).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let services = await Services.findOne();
    if (!services) {
      services = await Services.create(req.body);
    } else {
      services = await Services.findByIdAndUpdate(services._id, req.body, { new: true, runValidators: true });
    }
    res.json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;