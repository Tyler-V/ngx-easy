import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyGridLayoutComponent } from './easy-grid-layout.component';

describe('EasyGridLayoutComponent', () => {
  let component: EasyGridLayoutComponent;
  let fixture: ComponentFixture<EasyGridLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyGridLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
