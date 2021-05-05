import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { SeedersModule } from './schemas/seeders/seeders.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedersModule, {
    logger: ['error'],
  });
  app.select(CommandModule).get(CommandService).exec();
}

bootstrap();
