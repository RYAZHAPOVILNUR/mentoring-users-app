import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCreateUiComponent } from './articles-create-ui.component';

describe('UsersArticlesArticlesCreateComponent', () => {
  let component: ArticlesCreateUiComponent;
  let fixture: ComponentFixture<ArticlesCreateUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesCreateUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesCreateUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
