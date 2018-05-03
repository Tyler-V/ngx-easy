import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyVirtualScrollComponent } from './easy-virtual-scroll.component';

describe('EasyVirtualScrollComponent', () => {
  let component: EasyVirtualScrollComponent;
  let fixture: ComponentFixture<EasyVirtualScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyVirtualScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
