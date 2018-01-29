import { TestBed, inject } from '@angular/core/testing';

import { EasyGridLayoutService } from './easy-grid-layout.service';

describe('EasyGridLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasyGridLayoutService]
    });
  });

  it('should be created', inject([EasyGridLayoutService], (service: EasyGridLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
