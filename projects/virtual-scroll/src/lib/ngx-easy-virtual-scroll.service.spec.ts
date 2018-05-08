import { TestBed, inject } from '@angular/core/testing';

import { NgxEasyVirtualScrollService } from './ngx-easy-virtual-scroll.service';

describe('NgxEasyVirtualScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxEasyVirtualScrollService]
    });
  });

  it('should be created', inject([NgxEasyVirtualScrollService], (service: NgxEasyVirtualScrollService) => {
    expect(service).toBeTruthy();
  }));
});
