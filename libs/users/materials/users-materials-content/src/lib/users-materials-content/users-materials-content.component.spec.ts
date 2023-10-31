import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsContentComponent } from './users-materials-content.component';

describe('UsersMaterialsContentComponent', () => {
  let component: UsersMaterialsContentComponent;
  let fixture: ComponentFixture<UsersMaterialsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
