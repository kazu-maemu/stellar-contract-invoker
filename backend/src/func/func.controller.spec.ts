import { Test, TestingModule } from '@nestjs/testing';
import { FuncController } from './func.controller';
import { FuncService } from './func.service';

describe('FuncController', () => {
  let controller: FuncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncController],
      providers: [FuncService],
    }).compile();

    controller = module.get<FuncController>(FuncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
