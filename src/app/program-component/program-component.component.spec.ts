import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramComponentComponent } from './program-component.component';

describe('ProgramComponentComponent', () => {
  let component: ProgramComponentComponent;
  let fixture: ComponentFixture<ProgramComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramComponentComponent]
    });
    fixture = TestBed.createComponent(ProgramComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
