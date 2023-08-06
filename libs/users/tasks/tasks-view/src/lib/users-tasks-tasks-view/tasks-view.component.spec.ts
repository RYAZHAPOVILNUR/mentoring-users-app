import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTasksTasksViewComponent } from './tasks-view.component';

describe('UsersTasksTasksViewComponent', () => {
  let component: UsersTasksTasksViewComponent;
  let fixture: ComponentFixture<UsersTasksTasksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTasksTasksViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTasksTasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
