import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesViewContainerComponent } from './articles-view-container.component';

describe('ArticlesViewContainerComponent', () => {
  let component: ArticlesViewContainerComponent;
  let fixture: ComponentFixture<ArticlesViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesViewContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
