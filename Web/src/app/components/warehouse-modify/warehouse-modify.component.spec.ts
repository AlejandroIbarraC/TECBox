import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseModifyComponent } from './warehouse-modify.component';

describe('WarehouseModifyComponent', () => {
  let component: WarehouseModifyComponent;
  let fixture: ComponentFixture<WarehouseModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
