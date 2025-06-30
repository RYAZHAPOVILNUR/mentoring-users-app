import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnComponent } from './tasks-column.component';

describe('TasksColumnComponent', () => {
  let component: TasksColumnComponent;
  let fixture: ComponentFixture<TasksColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
