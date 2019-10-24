import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Appointment from '../app/models/Appointment';
import File from '../app/models/File';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [Appointment, User, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/gobarber',
      {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  }
}

export default new Database();
