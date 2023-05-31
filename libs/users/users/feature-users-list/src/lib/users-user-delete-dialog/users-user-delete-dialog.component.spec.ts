import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUserDeleteDialogComponent } from './users-user-delete-dialog.component';

describe('UsersUserDeleteDialogComponent', () => {
  let component: UsersUserDeleteDialogComponent;
  let fixture: ComponentFixture<UsersUserDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUserDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUserDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
