import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCreateDialogComponent } from './users-create-folder-dialog.component';

describe('UsersMaterialsComponent', () => {
  let component: UsersCreateDialogComponent;
  let fixture: ComponentFixture<UsersCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
