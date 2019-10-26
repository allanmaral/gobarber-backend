import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';

class AvailableController {
  static async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ error: 'Invalid date.' });
    }

    const searchDate = Number(date);
    console.log(req.params.providerId);
    console.log(startOfDay(searchDate), endOfDay(searchDate));

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    return res.json(appointments);
  }
}

export default AvailableController;
