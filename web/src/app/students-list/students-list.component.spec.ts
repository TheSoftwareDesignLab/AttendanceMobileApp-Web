import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsListComponent } from './students-list.component';

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //desde el ant
  it(`should have as title 'lista-asistencia-web'`, () => {
    const fixture = TestBed.createComponent(StudentsListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('lista-asistencia-web');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(StudentsListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to lista-asistencia-web!');
  });
});
