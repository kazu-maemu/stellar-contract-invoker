import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncDto } from './dto/create-func.dto';
import { UpdateFuncDto } from './dto/update-func.dto';
import { Func } from './entities/func.entity';

@Injectable()
export class FuncService {
  constructor(
    @InjectRepository(Func)
    private funcRepository: Repository<Func>,
  ) {}

  create(createFuncDto: CreateFuncDto) {
    return this.funcRepository.save(createFuncDto);
  }

  findAll() {
    return this.funcRepository.find();
  }

  async findOne(id: number) {
    const func = await this.funcRepository.findOne({ where: { id } });
    if (!func) throw new NotFoundException();
    return func;
  }

  async update(id: number, updateFuncDto: UpdateFuncDto) {
    const func = await this.findOne(id);
    Object.assign(func, updateFuncDto);
    return this.funcRepository.save(func);
  }

  remove(id: number) {
    return this.funcRepository.delete(id);
  }
}
