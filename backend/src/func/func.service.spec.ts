import { Test, TestingModule } from '@nestjs/testing';
import { FuncService } from './func.service';

describe('FuncService', () => {
  let service: FuncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncService],
    }).compile();

    service = module.get<FuncService>(FuncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
