import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThemeHeaderComponent } from './change-theme-header.component';

describe('ChangeThemeComponentHeader', () => {
  let component: ChangeThemeHeaderComponent;
  let fixture: ComponentFixture<ChangeThemeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeThemeHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeThemeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
