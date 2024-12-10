import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.create({ title, description, date });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
