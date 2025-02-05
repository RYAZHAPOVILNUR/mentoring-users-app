import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFolderComponent } from './users-folder.component';

describe('UsersMaterialsComponent', () => {
  let component: UsersFolderComponent;
  let fixture: ComponentFixture<UsersFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
