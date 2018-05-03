import { EasyVirtualScrollModule } from './easy-virtual-scroll.module';

describe('EasyVirtualScrollModule', () => {
  let easyVirtualScrollModule: EasyVirtualScrollModule;

  beforeEach(() => {
    easyVirtualScrollModule = new EasyVirtualScrollModule();
  });

  it('should create an instance', () => {
    expect(easyVirtualScrollModule).toBeTruthy();
  });
});
