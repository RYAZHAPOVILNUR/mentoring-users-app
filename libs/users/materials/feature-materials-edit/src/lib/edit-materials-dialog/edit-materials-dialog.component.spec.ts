import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMaterialsDialogComponent } from './edit-materials-dialog.component';

describe('EditMaterialsDialogComponent', () => {
  let component: EditMaterialsDialogComponent;
  let fixture: ComponentFixture<EditMaterialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMaterialsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditMaterialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
