import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  create(createContractDto: CreateContractDto) {
    return this.contractRepository.save(createContractDto);
  }

  findAll() {
    return this.contractRepository.find();
  }

  async findOne(id: number) {
    const contract = await this.contractRepository.findOne({ where: { id } });
    if (!contract) throw new NotFoundException();
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract = await this.findOne(id);
    Object.assign(contract, updateContractDto);
    return this.contractRepository.save(contract);
  }

  remove(id: number) {
    return this.contractRepository.delete(id);
  }
}
