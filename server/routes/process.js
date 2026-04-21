import express from 'express';
import Process from '../models/Process.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let process = await Process.findOne();
    if (!process) {
      return res.status(404).json({ message: 'Process data not found' });
    }
    res.json(process);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const process = await Process.create(req.body);
    res.status(201).json(process);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let processData = await Process.findOne();
    if (!processData) {
      processData = await Process.create(req.body);
    } else {
      processData = await Process.findByIdAndUpdate(processData._id, req.body, { new: true, runValidators: true });
    }
    res.json(processData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;