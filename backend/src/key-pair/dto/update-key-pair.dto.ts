import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyPairDto } from './create-key-pair.dto';

export class UpdateKeyPairDto extends PartialType(CreateKeyPairDto) {}
