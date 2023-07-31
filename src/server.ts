import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config';
import config from './config';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('💻💻💻💻Database connected successfully | YAY');

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
