import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesViewComponentComponent } from './teacher-courses-view-component.component';

describe('TeacherCoursesViewComponentComponent', () => {
  let component: TeacherCoursesViewComponentComponent;
  let fixture: ComponentFixture<TeacherCoursesViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCoursesViewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCoursesViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
