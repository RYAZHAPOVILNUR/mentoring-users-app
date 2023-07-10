import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthorizedUserLayoutComponentComponent } from './unauthorized-user-layout-component.component';

describe('UnauthorizedUserLayoutComponentComponent', () => {
  let component: UnauthorizedUserLayoutComponentComponent;
  let fixture: ComponentFixture<UnauthorizedUserLayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedUserLayoutComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizedUserLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
