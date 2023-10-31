import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListFilterComponent } from './users-list-filter.component';

describe('UsersListFilterComponent', () => {
  let component: UsersListFilterComponent;
  let fixture: ComponentFixture<UsersListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
