import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderDeleteDialogComponent } from './folder-delete-dialog.component';

describe('FolderDeleteDialogComponent', () => {
  let component: FolderDeleteDialogComponent;
  let fixture: ComponentFixture<FolderDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
