import dotenv from 'dotenv';

dotenv.config();

export default {
  dbConnectionString: process.env.DATABASE_URL,
  httpPort: process.env.HTTP_PORT || 8080,
  jwtSecret: process.env.JWT_SECRET,
  redis: {
    uri: process.env.REDIS_URL,
  },
};
