import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsContentContainerComponent } from './users-materials-content-container.component';

describe('UsersMaterialsContentContainerComponent', () => {
  let component: UsersMaterialsContentContainerComponent;
  let fixture: ComponentFixture<UsersMaterialsContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsContentContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
