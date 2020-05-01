import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRouteComponent } from './modify-route.component';

describe('ModifyRouteComponent', () => {
  let component: ModifyRouteComponent;
  let fixture: ComponentFixture<ModifyRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
