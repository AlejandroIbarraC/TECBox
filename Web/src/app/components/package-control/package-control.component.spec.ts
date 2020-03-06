import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageControlComponent } from './package-control.component';

describe('PackageControlComponent', () => {
  let component: PackageControlComponent;
  let fixture: ComponentFixture<PackageControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
