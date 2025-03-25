import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMaterialListContainerComponent } from './user-material-list-container.component';

describe('UserMaterialListContainerComponent', () => {
  let component: UserMaterialListContainerComponent;
  let fixture: ComponentFixture<UserMaterialListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMaterialListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMaterialListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
