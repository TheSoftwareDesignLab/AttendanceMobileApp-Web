import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuizComponent } from './random-quiz.component';

describe('RandomQuizComponent', () => {
  let component: RandomQuizComponent;
  let fixture: ComponentFixture<RandomQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
