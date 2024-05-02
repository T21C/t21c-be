import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  });
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('TUF API')
    .setDescription(
      `This is the official open API for The Universal Forums.

You can currently:

- view level info
- view passes info
  
We're planning to expand the API in the future!
`,
    )
    .setExternalDoc(
      'The Universal Forums',
      'https://docs.google.com/spreadsheets/d/1eaA1gyZ-6OWFthHFcVTfLV62U_MbpP6PHc8udN24iCg/edit',
    )
    .setVersion('0.0.1')
    .addTag('levels')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'token',
        in: 'query',
      },
      'apiKey',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
