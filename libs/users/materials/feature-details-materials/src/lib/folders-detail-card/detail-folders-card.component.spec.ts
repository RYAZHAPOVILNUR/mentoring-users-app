import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailFoldersCardComponent } from './detail-folders-card.component';

describe('DetailFoldersCardComponent', () => {
  let component: DetailFoldersCardComponent;
  let fixture: ComponentFixture<DetailFoldersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFoldersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFoldersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
