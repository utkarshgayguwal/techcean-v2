import express from 'express';
import Home from '../models/Home.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      return res.status(404).json({ message: 'Home data not found' });
    }
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const home = await Home.create(req.body);
    res.status(201).json(home);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create(req.body);
    } else {
      home = await Home.findByIdAndUpdate(home._id, req.body, { new: true, runValidators: true });
    }
    res.json(home);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;