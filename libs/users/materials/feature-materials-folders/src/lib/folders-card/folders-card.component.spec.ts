import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMaterialsComponent } from './folders-card.component';

describe('UsersMaterialsComponent', () => {
  let component: UsersMaterialsComponent;
  let fixture: ComponentFixture<UsersMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMaterialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
