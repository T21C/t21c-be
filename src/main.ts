import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('T21+C API')
    .setDescription(
      `This is an API for the 21+ Collective, specifically the 21 Forums!

You can currently:

- view level info
  
We're planning to expand the API in the future!
`,
    )
    .setExternalDoc(
      'The 21 Forums',
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
