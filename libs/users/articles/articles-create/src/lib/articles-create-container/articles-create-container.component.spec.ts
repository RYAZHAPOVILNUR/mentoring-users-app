import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCreateContainerComponent } from './articles-create-container.component';

describe('ArticlesCreateContainerComponent', () => {
  let component: ArticlesCreateContainerComponent;
  let fixture: ComponentFixture<ArticlesCreateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesCreateContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
