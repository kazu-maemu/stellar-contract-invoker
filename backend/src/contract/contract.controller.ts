import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { exec } from 'child_process';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { RunContractDto } from './dto/run-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Post('run')
  run(@Body() runContractDto: RunContractDto) {
    return new Promise((resolve) => {
      exec(runContractDto.command, (error, stdout, stderr) => {
        resolve({ stdout, stderr });
      });
    });
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
