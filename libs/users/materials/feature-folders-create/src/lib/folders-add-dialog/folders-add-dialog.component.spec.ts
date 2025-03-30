import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersAddDialogComponent } from './folders-add-dialog.component';

describe('FoldersAddDialogComponent', () => {
  let component: FoldersAddDialogComponent;
  let fixture: ComponentFixture<FoldersAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersAddDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
