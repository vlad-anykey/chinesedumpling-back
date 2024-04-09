import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getMongoDbConfig } from './config/mongo.config'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'
import { SubjectModule } from './subject/subject.module';
import { EventModule } from './event/event.module';
import { FileModule } from './file/file.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    UserModule, AuthModule, SubjectModule, EventModule, FileModule, ItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
