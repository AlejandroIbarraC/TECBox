import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBranchComponent } from './modify-branch.component';

describe('ModifyBranchComponent', () => {
  let component: ModifyBranchComponent;
  let fixture: ComponentFixture<ModifyBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
