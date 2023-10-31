import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsFoldersComponent } from './users-materials-folders.component';

describe('UsersMaterialsComponent', () => {
  let component: UsersMaterialsFoldersComponent;
  let fixture: ComponentFixture<UsersMaterialsFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsFoldersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
