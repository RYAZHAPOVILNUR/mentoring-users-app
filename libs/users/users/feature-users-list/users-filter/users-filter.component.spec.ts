import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFilterComponent } from './users-filter.component';

describe('UsersFilterComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correctly', () => {
    expect(component).toBeTruthy();
  });
});
