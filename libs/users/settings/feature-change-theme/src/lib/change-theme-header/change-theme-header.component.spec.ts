import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeThemeComponentHeader } from './change-theme-header.component';

describe('ChangeThemeComponentHeader', () => {
  let component: ChangeThemeComponentHeader;
  let fixture: ComponentFixture<ChangeThemeComponentHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeThemeComponentHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeThemeComponentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
