import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersArticlesDataAccessComponent } from './users-articles-data-access.component';

describe('UsersArticlesDataAccessComponent', () => {
  let component: UsersArticlesDataAccessComponent;
  let fixture: ComponentFixture<UsersArticlesDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersArticlesDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersArticlesDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
