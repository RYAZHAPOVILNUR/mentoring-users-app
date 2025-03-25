import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderCardComponent } from './folder-card.component';

describe('FolderCardComponent', () => {
  let component: FolderCardComponent;
  let fixture: ComponentFixture<FolderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
