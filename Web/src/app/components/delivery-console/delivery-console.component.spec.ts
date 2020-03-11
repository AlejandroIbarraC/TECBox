import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConsoleComponent } from './delivery-console.component';

describe('DeliveryConsoleComponent', () => {
  let component: DeliveryConsoleComponent;
  let fixture: ComponentFixture<DeliveryConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
