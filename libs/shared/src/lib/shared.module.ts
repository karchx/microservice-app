import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PromisifyHttpService, StringUtilService } from './services';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [PromisifyHttpService, StringUtilService],
  exports: [PromisifyHttpService, StringUtilService],
})
export class SharedModule {}
