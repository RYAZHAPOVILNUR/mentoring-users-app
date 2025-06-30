import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedUserLayoutComponent } from './unauthorized-user-layout-component.component';

describe('UnauthorizedUserLayoutComponentComponent', () => {
  let component: UnauthorizedUserLayoutComponent;
  let fixture: ComponentFixture<UnauthorizedUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedUserLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizedUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
