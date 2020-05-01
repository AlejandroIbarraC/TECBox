import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySellerComponent } from './modify-seller.component';

describe('ModifySellerComponent', () => {
  let component: ModifySellerComponent;
  let fixture: ComponentFixture<ModifySellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
