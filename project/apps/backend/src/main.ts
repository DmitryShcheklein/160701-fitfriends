import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerService } from './app/services/swagger.service';
import { ConfigService } from '@nestjs/config';
import { apiReference } from '@scalar/nestjs-api-reference';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const swaggerService = app.get(SwaggerService);
  const {
    config,
    swaggerCustomOptions,
    SWAGGER_PATH_PREFIX,
    SWAGGER_JSON_PREFIX,
  } = swaggerService.createConfig();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PATH_PREFIX, app, document, {
    ...swaggerCustomOptions,
    swaggerUiEnabled: false,
  });

  app.use(
    `/${SWAGGER_PATH_PREFIX}`,
    apiReference({
      spec: {
        content: document,
      },
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
  Logger.log(
    `🚀 Swagger api is running on: http://localhost:${port}/${SWAGGER_PATH_PREFIX}`
  );
  Logger.log(
    `🚀 Swagger json is running on: http://localhost:${port}/${SWAGGER_JSON_PREFIX}`
  );
}

bootstrap();
