import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsListComponent } from './materials-list.component';

describe('UsersFeatureMaterialsListComponent', () => {
  let component: UsersMaterialsListComponent;
  let fixture: ComponentFixture<UsersMaterialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
