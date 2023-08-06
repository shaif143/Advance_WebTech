import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const express = require('express');
  const cors = require('cors');


// Allow requests from all origins for demonstration purposes.
// In a production environment, you should configure this based on your needs.
app.use(cors());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000
      }
    }),
  );

  await app.listen(3000);
}

bootstrap();
