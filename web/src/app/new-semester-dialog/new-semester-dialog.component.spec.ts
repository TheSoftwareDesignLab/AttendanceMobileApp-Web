import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSemesterDialogComponent } from './new-semester-dialog.component';

describe('NewSemesterDialogComponent', () => {
  let component: NewSemesterDialogComponent;
  let fixture: ComponentFixture<NewSemesterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSemesterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSemesterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
