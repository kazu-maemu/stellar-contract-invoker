import { Test, TestingModule } from '@nestjs/testing';
import { KeyPairService } from './key-pair.service';

describe('KeyPairService', () => {
  let service: KeyPairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyPairService],
    }).compile();

    service = module.get<KeyPairService>(KeyPairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
