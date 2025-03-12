import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Func } from './entities/func.entity';
import { FuncController } from './func.controller';
import { FuncService } from './func.service';

@Module({
  imports: [TypeOrmModule.forFeature([Func])],
  controllers: [FuncController],
  providers: [FuncService],
})
export class FuncModule {}
