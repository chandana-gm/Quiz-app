import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndQuizComponent } from './end-quiz.component';

describe('EndQuizComponent', () => {
  let component: EndQuizComponent;
  let fixture: ComponentFixture<EndQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndQuizComponent]
    });
    fixture = TestBed.createComponent(EndQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
