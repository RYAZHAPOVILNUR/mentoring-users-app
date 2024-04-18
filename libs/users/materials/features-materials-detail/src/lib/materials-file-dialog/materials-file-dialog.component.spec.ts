import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsFileDialogComponent } from './materials-file-dialog.component';

describe('MaterialsFileDialogComponent', () => {
  let component: MaterialsFileDialogComponent;
  let fixture: ComponentFixture<MaterialsFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsFileDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
