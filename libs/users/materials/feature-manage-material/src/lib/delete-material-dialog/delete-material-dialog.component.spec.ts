import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMaterialDialogComponent } from './delete-material-dialog.component';

describe('DeleteMaterialDialogComponent', () => {
  let component: DeleteMaterialDialogComponent;
  let fixture: ComponentFixture<DeleteMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMaterialDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
