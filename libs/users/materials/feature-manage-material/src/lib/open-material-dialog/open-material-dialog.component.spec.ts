import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenMaterialDialogComponent } from './open-material-dialog.component';

describe('OpenMaterialDialogComponent', () => {
  let component: OpenMaterialDialogComponent;
  let fixture: ComponentFixture<OpenMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenMaterialDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
