import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsFeatureFoldersListComponent } from './folders-list.component';

describe('UsersMaterialsFeatureFoldersListComponent', () => {
  let component: UsersMaterialsFeatureFoldersListComponent;
  let fixture: ComponentFixture<UsersMaterialsFeatureFoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsFeatureFoldersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsFeatureFoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
