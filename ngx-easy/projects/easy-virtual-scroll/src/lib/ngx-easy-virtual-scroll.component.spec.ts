import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEasyVirtualScrollComponent } from './ngx-easy-virtual-scroll.component';

describe('NgxEasyVirtualScrollComponent', () => {
  let component: NgxEasyVirtualScrollComponent;
  let fixture: ComponentFixture<NgxEasyVirtualScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEasyVirtualScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEasyVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
