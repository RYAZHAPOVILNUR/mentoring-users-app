import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddPdfDialogComponent } from './materials-add-pdf-dialog.component';

describe('MaterialsAddPdfDialogComponent', () => {
  let component: MaterialsAddPdfDialogComponent;
  let fixture: ComponentFixture<MaterialsAddPdfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddPdfDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddPdfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
