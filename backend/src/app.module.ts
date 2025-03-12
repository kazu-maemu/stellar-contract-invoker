import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractModule } from './contract/contract.module';
import { FuncModule } from './func/func.module';
import { KeyPairModule } from './key-pair/key-pair.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm')!,
    }),
    ContractModule,
    KeyPairModule,
    FuncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
