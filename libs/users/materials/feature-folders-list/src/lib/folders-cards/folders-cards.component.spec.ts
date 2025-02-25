import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersCardsComponent } from './folders-cards.component';

describe('FoldersCardsComponent', () => {
  let component: FoldersCardsComponent;
  let fixture: ComponentFixture<FoldersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
