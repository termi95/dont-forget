import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://127.0.0.1:5173',
        'http://localhost',
        'https://localhost',
      ],
      credentials: true,
    },
  });
  app.use(helmet());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
