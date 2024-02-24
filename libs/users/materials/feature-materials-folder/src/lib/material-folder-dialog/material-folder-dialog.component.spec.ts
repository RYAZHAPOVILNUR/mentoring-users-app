import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialFolderDialogComponent } from './material-folder-dialog.component';

describe('MaterialFolderDialogComponent', () => {
  let component: MaterialFolderDialogComponent;
  let fixture: ComponentFixture<MaterialFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialFolderDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
