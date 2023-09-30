import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeColorComponent } from './change-color.component';

describe('ChangeColorComponent', () => {
  let component: ChangeColorComponent;
  let fixture: ComponentFixture<ChangeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
