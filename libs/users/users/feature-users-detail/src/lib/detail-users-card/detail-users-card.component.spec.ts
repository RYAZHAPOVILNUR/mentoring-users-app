import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailUsersCardComponent } from './detail-users-card.component';

describe('DetailUsersCardComponent', () => {
  let component: DetailUsersCardComponent;
  let fixture: ComponentFixture<DetailUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailUsersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
