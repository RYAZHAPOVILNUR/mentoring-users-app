import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersCardComponent } from './folders-card.component';

describe('FoldersCardsComponent', () => {
  let component: FoldersCardComponent;
  let fixture: ComponentFixture<FoldersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
