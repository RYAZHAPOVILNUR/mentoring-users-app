import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFilterDialogComponent } from './user-filter-dialog.component';

describe('UserFilterDilogComponent', () => {
  let component: UserFilterDialogComponent;
  let fixture: ComponentFixture<UserFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFilterDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
