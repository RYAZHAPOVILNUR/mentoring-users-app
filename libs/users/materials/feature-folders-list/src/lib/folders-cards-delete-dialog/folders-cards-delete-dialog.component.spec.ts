import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersCardsDeleteDialogComponent } from './folders-cards-delete-dialog.component';

describe('FoldersCardsDeleteDialogComponent', () => {
  let component: FoldersCardsDeleteDialogComponent;
  let fixture: ComponentFixture<FoldersCardsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersCardsDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersCardsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
