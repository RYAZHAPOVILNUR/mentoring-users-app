import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderAddDialogComponent } from './folder-add-dialog.component';

describe('FolderAddDialogComponent', () => {
  let component: FolderAddDialogComponent;
  let fixture: ComponentFixture<FolderAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderAddDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
