import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsFolsersContainerComponent } from './users-materials-folders-container.component';

describe('UsersMaterialsContainerComponent', () => {
  let component: UsersMaterialsFolsersContainerComponent;
  let fixture: ComponentFixture<UsersMaterialsFolsersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsFolsersContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsFolsersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
