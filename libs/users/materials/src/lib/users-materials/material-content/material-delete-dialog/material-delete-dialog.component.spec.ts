import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialDeleteDialogComponent } from './material-delete-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MaterialDeleteDialogComponent', () => {
  let component: MaterialDeleteDialogComponent;
  let fixture: ComponentFixture<MaterialDeleteDialogComponent>;
  let mockDialogRef: { close: jest.Mock };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MaterialDeleteDialogComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true on confirm', () => {
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
}); 