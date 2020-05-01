import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyWorkerComponent } from './modify-worker.component';

describe('ModifyWorkerComponent', () => {
  let component: ModifyWorkerComponent;
  let fixture: ComponentFixture<ModifyWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
