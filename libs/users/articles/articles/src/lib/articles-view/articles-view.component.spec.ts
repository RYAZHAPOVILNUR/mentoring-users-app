import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesViewComponent } from './articles-view.component';

describe('ArticlesViewComponent', () => {
  let component: ArticlesViewComponent;
  let fixture: ComponentFixture<ArticlesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
