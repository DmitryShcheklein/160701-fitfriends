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
      .build();

    const swaggerCustomOptions: SwaggerCustomOptions = {
      customSiteTitle: `[API ${PROJECT_NAME}] Swagger UI`,
    };

    return { config, swaggerCustomOptions };
  }
}
