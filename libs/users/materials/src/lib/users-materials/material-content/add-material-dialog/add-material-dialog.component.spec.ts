import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMaterialDialogComponent } from './add-material-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddMaterialDialogComponent', () => {
  let component: AddMaterialDialogComponent;
  let fixture: ComponentFixture<AddMaterialDialogComponent>;
  let mockDialogRef: { close: jest.Mock };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        AddMaterialDialogComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with form value on submit when form is valid', () => {
    const testValue = {
      title: 'Test Title',
      link: 'https://test.com'
    };
    
    component.materialForm.setValue(testValue);
    component.onSubmit();
    
    expect(mockDialogRef.close).toHaveBeenCalledWith(testValue);
  });

  it('should not close dialog on submit when form is invalid', () => {
    component.onSubmit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog without value on cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });
}); 