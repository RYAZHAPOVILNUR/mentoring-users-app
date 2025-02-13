import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFiltersComponent } from './users-filter.component';

describe('UsersFiltersComponent', () => {
  let component: UsersFiltersComponent;
  let fixture: ComponentFixture<UsersFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersFiltersComponent]
    });
    fixture = TestBed.createComponent(UsersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
