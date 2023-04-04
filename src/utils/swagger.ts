import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

/**
 * @author MyeongSeok
 * @description Swagger 세팅
 */
export class SwaggerSetup {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  setup(): void {
    //웹 페이지를 새로고침을 해도 Token 값 유지
    const swaggerCustomOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
    };

    const swaggerConfig = new DocumentBuilder()
      .setTitle("API DOCS - let's Git it")
      .setDescription("The let's Git it API description")
      .setVersion('1.0.0')
      .addTag('Auth')
      .addTag('Community')
      .addTag('Ranks')
      .addTag('User')
      //JWT 토큰 설정
      .addBearerAuth(
        {
          // type: 'oauth2',
          // scheme: 'Bearer',
          type: 'http',
          scheme: 'bearer',
          name: 'Authorization',
          in: 'header',
          bearerFormat: 'JWT',

          // flows: {
          //   authorizationCode: {
          //     scopes: { write: '', read: '' },
          //     authorizationUrl: `https://github.com/login/oauth/authorize?client_id=${process.env.AUTH_CLIENT_ID}`,
          //   },
          // },
        },
        'accessToken',
      )
      .addCookieAuth('Refresh')
      .build();

    const swaggerOptions: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const swaggerDocs = SwaggerModule.createDocument(
      this.app,
      swaggerConfig,
      swaggerOptions,
    );

    SwaggerModule.setup(
      'api-docs',
      this.app,
      swaggerDocs,
      swaggerCustomOptions,
    );
  }
}
