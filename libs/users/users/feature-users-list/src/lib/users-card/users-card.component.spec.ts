import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCardComponent } from './users-card.component';

describe('UsersCardComponent', () => {
  let component: UsersCardComponent;
  let fixture: ComponentFixture<UsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
