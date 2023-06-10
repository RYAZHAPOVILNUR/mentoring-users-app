import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersDetailComponent } from './users-detail.component';

describe('UsersUsersFeatureUsersDetailComponent', () => {
  let component: UsersDetailComponent;
  let fixture: ComponentFixture<UsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
