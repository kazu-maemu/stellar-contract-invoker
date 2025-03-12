import { Test, TestingModule } from '@nestjs/testing';
import { KeyPairController } from './key-pair.controller';
import { KeyPairService } from './key-pair.service';

describe('KeyPairController', () => {
  let controller: KeyPairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyPairController],
      providers: [KeyPairService],
    }).compile();

    controller = module.get<KeyPairController>(KeyPairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
