import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersDeleteDialogComponent } from './folders-delete-dialog.component';

describe('FoldersDeleteDialogComponent', () => {
  let component: FoldersDeleteDialogComponent;
  let fixture: ComponentFixture<FoldersDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
