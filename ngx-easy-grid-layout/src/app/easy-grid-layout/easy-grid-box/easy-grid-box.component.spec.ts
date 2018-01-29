import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyGridBoxComponent } from './easy-grid-box.component';

describe('EasyGridBoxComponent', () => {
  let component: EasyGridBoxComponent;
  let fixture: ComponentFixture<EasyGridBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyGridBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyGridBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
