import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AuthKeyName, appConfig } from '@project/config';

@Injectable()
export class SwaggerService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  createConfig() {
    const PROJECT_NAME = 'Fit Friends';
    const SWAGGER_PATH_PREFIX = 'spec';
    const SWAGGER_JSON_PREFIX = `${SWAGGER_PATH_PREFIX}/api-json`;

    const config = new DocumentBuilder()
      .setTitle(`API сервер для проекта «${PROJECT_NAME}»`)
      .setDescription(`Список ресурсов и маршрутов сервера «${PROJECT_NAME}»`)
      .setVersion('1.0')
      .addTag('auth', 'Аутентификация и Регистрация')
      .addTag('user', 'Пользователь')
      .addTag('trainings', 'Тренировки')
      .addTag('comments', 'Отзывы')
      .addTag('orders', 'Заказы')
      .addTag('balance', 'Баланс')
      .addBearerAuth(
        {
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        AuthKeyName
      )
      // .setDescription(
      //   `<a href="https://insomnia.rest/run/?label=FitFriends&uri=http%3A%2F%2Flocalhost%3A3333%2F${SWAGGER_PATH_PREFIX}%2Fapi-json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>`
      // )
      .build();

    const swaggerCustomOptions: SwaggerCustomOptions = {
      customSiteTitle: `[API ${PROJECT_NAME}] Swagger UI`,
      jsonDocumentUrl: SWAGGER_JSON_PREFIX,
    };

    return {
      config,
      swaggerCustomOptions,
      SWAGGER_PATH_PREFIX,
      SWAGGER_JSON_PREFIX,
    };
  }
}
