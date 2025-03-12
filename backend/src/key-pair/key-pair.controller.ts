import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyPairService } from './key-pair.service';
import { CreateKeyPairDto } from './dto/create-key-pair.dto';
import { UpdateKeyPairDto } from './dto/update-key-pair.dto';

@Controller('key-pair')
export class KeyPairController {
  constructor(private readonly keyPairService: KeyPairService) {}

  @Post()
  create(@Body() createKeyPairDto: CreateKeyPairDto) {
    return this.keyPairService.create(createKeyPairDto);
  }

  @Get()
  findAll() {
    return this.keyPairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyPairService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyPairDto: UpdateKeyPairDto) {
    return this.keyPairService.update(+id, updateKeyPairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyPairService.remove(+id);
  }
}
