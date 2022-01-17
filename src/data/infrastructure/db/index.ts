import mongoose from 'mongoose';

export class Database {
  mongo?: mongoose.Mongoose;

  constructor(private readonly dbConnectionString: string) {}

  getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  async connect() {
    this.mongo = await mongoose.connect(this.dbConnectionString);
  }

  async close() {
    if (this.mongo) {
      await this.mongo.disconnect();
    }
  }
}
