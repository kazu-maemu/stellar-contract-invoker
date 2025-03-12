import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFuncDto } from './dto/create-func.dto';
import { UpdateFuncDto } from './dto/update-func.dto';
import { FuncService } from './func.service';

@Controller('func')
export class FuncController {
  constructor(private readonly funcService: FuncService) {}

  @Post()
  create(@Body() createFuncDto: CreateFuncDto) {
    return this.funcService.create(createFuncDto);
  }

  @Get()
  findAll() {
    return this.funcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncDto: UpdateFuncDto) {
    return this.funcService.update(+id, updateFuncDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcService.remove(+id);
  }
}
