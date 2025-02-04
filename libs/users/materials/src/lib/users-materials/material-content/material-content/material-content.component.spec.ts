import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialContentComponent } from './material-content.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialType } from '@users/materials/data-access';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MaterialContentComponent', () => {
  let component: MaterialContentComponent;
  let fixture: ComponentFixture<MaterialContentComponent>;
  let mockDialogRef: { close: jest.Mock };

  const mockVideoData = {
    title: 'Test Video',
    material_link: 'https://www.youtube.com/watch?v=test123',
    type: MaterialType.VIDEO
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MaterialContentComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockVideoData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract YouTube video ID correctly', () => {
    const videoId = component.getVideoId();
    expect(videoId).toBe('test123');
  });

  it('should close dialog', () => {
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
}); 