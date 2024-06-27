import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { Command } from 'commander';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const program = new Command();

  program
    .option('-p, --products <number>', 'Number of products', '10')
    .parse(process.argv);

  //   const options = program.opts();

  const seedService = app.select(SeedModule).get(SeedService);

  await seedService.seed();

  //   console.log(`${options.products} products created`);
  await app.close();
}

bootstrap();
