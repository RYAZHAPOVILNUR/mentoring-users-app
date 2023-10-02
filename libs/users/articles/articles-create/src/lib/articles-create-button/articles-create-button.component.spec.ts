import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesCreateButtonComponent } from './articles-create-button.component';

describe('ArticlesCreateButtonComponent', () => {
  let component: ArticlesCreateButtonComponent;
  let fixture: ComponentFixture<ArticlesCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesCreateButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
