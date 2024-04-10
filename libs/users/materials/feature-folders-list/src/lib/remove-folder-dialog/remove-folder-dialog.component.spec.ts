import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveFolderDialogComponent } from './remove-folder-dialog.component';

describe('RemoveFolderDialogComponent', () => {
  let component: RemoveFolderDialogComponent;
  let fixture: ComponentFixture<RemoveFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFolderDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
