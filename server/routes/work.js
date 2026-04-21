import express from 'express';
import Work from '../models/Work.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let work = await Work.findOne();
    if (!work) {
      return res.status(404).json({ message: 'Work data not found' });
    }
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const work = await Work.create(req.body);
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let work = await Work.findOne();
    if (!work) {
      work = await Work.create(req.body);
    } else {
      work = await Work.findByIdAndUpdate(work._id, req.body, { new: true, runValidators: true });
    }
    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;