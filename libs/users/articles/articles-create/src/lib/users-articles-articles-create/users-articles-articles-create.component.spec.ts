import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersArticlesArticlesCreateComponent } from './users-articles-articles-create.component';

describe('UsersArticlesArticlesCreateComponent', () => {
  let component: UsersArticlesArticlesCreateComponent;
  let fixture: ComponentFixture<UsersArticlesArticlesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersArticlesArticlesCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersArticlesArticlesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
