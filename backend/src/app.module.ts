import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomLogger } from './logger/logger.service';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env.development", isGlobal: true }),
    LoggerModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017/EasyGenDB"),
  ],
  exports: [CustomLogger],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).exclude('api/docs/*path').forRoutes('*');
  }
}
