import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPollOptionComponent } from './new-poll-option.component';

describe('NewPollOptionComponent', () => {
  let component: NewPollOptionComponent;
  let fixture: ComponentFixture<NewPollOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPollOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
