import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUsersDialogComponent } from './create-users-dialog.component';

describe('CreateUsersDialogComponent', () => {
  let component: CreateUsersDialogComponent;
  let fixture: ComponentFixture<CreateUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
