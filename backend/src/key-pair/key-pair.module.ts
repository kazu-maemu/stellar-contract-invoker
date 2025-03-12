import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyPair } from './entities/key-pair.entity';
import { KeyPairController } from './key-pair.controller';
import { KeyPairService } from './key-pair.service';

@Module({
  imports: [TypeOrmModule.forFeature([KeyPair])],
  controllers: [KeyPairController],
  providers: [KeyPairService],
})
export class KeyPairModule {}
