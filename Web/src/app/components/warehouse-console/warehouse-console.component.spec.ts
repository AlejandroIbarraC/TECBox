import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseConsoleComponent } from './warehouse-console.component';

describe('WarehouseConsoleComponent', () => {
  let component: WarehouseConsoleComponent;
  let fixture: ComponentFixture<WarehouseConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
