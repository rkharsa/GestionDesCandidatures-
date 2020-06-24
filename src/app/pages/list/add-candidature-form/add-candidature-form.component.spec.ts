import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidatureFormComponent } from './add-candidature-form.component';

describe('AddCandidatureFormComponent', () => {
  let component: AddCandidatureFormComponent;
  let fixture: ComponentFixture<AddCandidatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCandidatureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
