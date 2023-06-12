import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersDetailCardContainerComponent } from './users-detail-card-container.component';

describe('UsersDetailCardContainerComponent', () => {
  let component: UsersDetailCardContainerComponent;
  let fixture: ComponentFixture<UsersDetailCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailCardContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDetailCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
