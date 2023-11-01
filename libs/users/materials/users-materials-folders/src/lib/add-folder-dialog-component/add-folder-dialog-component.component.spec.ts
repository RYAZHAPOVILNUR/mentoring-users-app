import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFolderDialogComponentComponent } from './add-folder-dialog-component.component';

describe('AddFolderDialogComponentComponent', () => {
  let component: AddFolderDialogComponentComponent;
  let fixture: ComponentFixture<AddFolderDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFolderDialogComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFolderDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
