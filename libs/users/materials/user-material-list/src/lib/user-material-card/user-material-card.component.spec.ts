import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMaterialCardComponent } from './user-material-card.component';

describe('UserMaterialCardComponent', () => {
  let component: UserMaterialCardComponent;
  let fixture: ComponentFixture<UserMaterialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMaterialCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
