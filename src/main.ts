import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/App.Module';
import * as dotenv from 'dotenv';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('USERS REGISTRATION API')
    .setDescription('USER REGISTRATION API description')
    .setVersion('1.0')
    .addTag('Swagger')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
