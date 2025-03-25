import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMaterialLsitComponent } from './user-material-lsit.component';

describe('UserMaterialLsitComponent', () => {
  let component: UserMaterialLsitComponent;
  let fixture: ComponentFixture<UserMaterialLsitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMaterialLsitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMaterialLsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
