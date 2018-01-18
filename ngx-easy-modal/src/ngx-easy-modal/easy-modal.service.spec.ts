import { TestBed, inject } from '@angular/core/testing';

import { EasyModalService } from './easy-modal.service';

describe('EasyModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasyModalService]
    });
  });

  it('should be created', inject([EasyModalService], (service: EasyModalService) => {
    expect(service).toBeTruthy();
  }));
});
