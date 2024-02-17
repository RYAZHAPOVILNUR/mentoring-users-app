import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersRemoveDialogComponent } from './folders-remove-dialog.component';

describe('FoldersAddDialogComponent', () => {
  let component: FoldersRemoveDialogComponent;
  let fixture: ComponentFixture<FoldersRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersRemoveDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
