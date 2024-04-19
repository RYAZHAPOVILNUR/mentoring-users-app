import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFolderDialogComponent } from './create-folder-dialog.component';

describe('CreateFolderDialogComponent', () => {
  let component: CreateFolderDialogComponent;
  let fixture: ComponentFixture<CreateFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFolderDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
