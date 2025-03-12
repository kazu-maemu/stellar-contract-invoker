import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyPairDto } from './dto/create-key-pair.dto';
import { UpdateKeyPairDto } from './dto/update-key-pair.dto';
import { KeyPair } from './entities/key-pair.entity';

@Injectable()
export class KeyPairService {
  constructor(
    @InjectRepository(KeyPair)
    private keyPairRepository: Repository<KeyPair>,
  ) {}

  create(createKeyPairDto: CreateKeyPairDto) {
    return this.keyPairRepository.save(createKeyPairDto);
  }

  findAll() {
    return this.keyPairRepository.find();
  }

  async findOne(id: number) {
    const keyPair = await this.keyPairRepository.findOne({ where: { id } });
    if (!keyPair) throw new NotFoundException();
    return keyPair;
  }

  async update(id: number, updateKeyPairDto: UpdateKeyPairDto) {
    const keyPair = await this.findOne(id);
    Object.assign(keyPair, updateKeyPairDto);
    return this.keyPairRepository.save(keyPair);
  }

  remove(id: number) {
    return this.keyPairRepository.delete(id);
  }
}
