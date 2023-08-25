import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReadComponent } from './article-read.component';

describe('ArticleReadComponent', () => {
  let component: ArticleReadComponent;
  let fixture: ComponentFixture<ArticleReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleReadComponent]
    });
    fixture = TestBed.createComponent(ArticleReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
