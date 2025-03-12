import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncDto } from './create-func.dto';

export class UpdateFuncDto extends PartialType(CreateFuncDto) {}
