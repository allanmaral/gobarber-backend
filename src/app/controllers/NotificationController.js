import Notification from '../models/Notification';
import User from '../models/User';

class NotificationController {
  static async index(req, res) {
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification
      .find({ user: req.userId })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  static async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    return res.json(notification);
  }
}

export default NotificationController;
