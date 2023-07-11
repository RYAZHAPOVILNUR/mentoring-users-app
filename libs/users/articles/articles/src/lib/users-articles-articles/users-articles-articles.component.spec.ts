import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersArticlesArticlesComponent } from './users-articles-articles.component';

describe('UsersArticlesArticlesComponent', () => {
  let component: UsersArticlesArticlesComponent;
  let fixture: ComponentFixture<UsersArticlesArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersArticlesArticlesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersArticlesArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
