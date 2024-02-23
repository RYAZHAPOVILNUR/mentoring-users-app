import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackNavButtonComponent } from './back-nav-button.component';

describe('BackNavButtonComponent', () => {
  let component: BackNavButtonComponent;
  let fixture: ComponentFixture<BackNavButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackNavButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackNavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
