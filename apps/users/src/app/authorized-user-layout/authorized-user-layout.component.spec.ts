import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizedUserLayoutComponent } from './authorized-user-layout.component';

describe('AuthorizedUserLayoutComponent', () => {
  let component: AuthorizedUserLayoutComponent;
  let fixture: ComponentFixture<AuthorizedUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizedUserLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizedUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
