import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTasksTasksViewContainerComponent } from './tasks-container.component';

describe('UsersTasksTasksViewContainerComponent', () => {
  let component: UsersTasksTasksViewContainerComponent;
  let fixture: ComponentFixture<UsersTasksTasksViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTasksTasksViewContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTasksTasksViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
