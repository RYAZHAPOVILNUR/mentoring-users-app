import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksContainerComponent } from './tasks-view-container.component';

describe('TasksViewContainerComponent', () => {
  let component: TasksContainerComponent;
  let fixture: ComponentFixture<TasksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
