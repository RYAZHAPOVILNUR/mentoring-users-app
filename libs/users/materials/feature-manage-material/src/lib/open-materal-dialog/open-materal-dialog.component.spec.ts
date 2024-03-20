import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenMateralDialogComponent } from './open-materal-dialog.component';

describe('OpenMateralDialogComponent', () => {
  let component: OpenMateralDialogComponent;
  let fixture: ComponentFixture<OpenMateralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenMateralDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMateralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
