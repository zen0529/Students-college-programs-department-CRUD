import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponentComponent } from './department-component.component';

describe('DepartmentComponentComponent', () => {
  let component: DepartmentComponentComponent;
  let fixture: ComponentFixture<DepartmentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentComponentComponent]
    });
    fixture = TestBed.createComponent(DepartmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
