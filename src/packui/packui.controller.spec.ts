import { Test, TestingModule } from '@nestjs/testing';
import { PackUiController } from './packui.controller';

describe('PackUiController', () => {
  let controller: PackUiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackUiController],
    }).compile();

    controller = module.get<PackUiController>(PackUiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
