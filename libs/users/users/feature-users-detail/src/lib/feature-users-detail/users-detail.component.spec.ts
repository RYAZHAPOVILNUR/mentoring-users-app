import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUsersFeatureUsersDetailComponent } from './users-users-feature-users-detail.component';

describe('UsersUsersFeatureUsersDetailComponent', () => {
  let component: UsersUsersFeatureUsersDetailComponent;
  let fixture: ComponentFixture<UsersUsersFeatureUsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUsersFeatureUsersDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUsersFeatureUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
