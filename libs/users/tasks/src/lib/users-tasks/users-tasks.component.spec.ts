import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTasksComponent } from './users-tasks.component';

describe('UsersTasksComponent', () => {
  let component: UsersTasksComponent;
  let fixture: ComponentFixture<UsersTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
