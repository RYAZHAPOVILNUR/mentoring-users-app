import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFoldersDialogComponent } from './edit-folders-dialog.component';

describe('EditFoldersDialogComponent', () => {
  let component: EditFoldersDialogComponent;
  let fixture: ComponentFixture<EditFoldersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFoldersDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFoldersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
