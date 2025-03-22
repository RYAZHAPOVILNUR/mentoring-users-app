import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderCardDeleteDialogComponent } from './folder-card-delete-dialog.component';

describe('FolderCardDeleteDialogComponent', () => {
  let component: FolderCardDeleteDialogComponent;
  let fixture: ComponentFixture<FolderCardDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderCardDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderCardDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
