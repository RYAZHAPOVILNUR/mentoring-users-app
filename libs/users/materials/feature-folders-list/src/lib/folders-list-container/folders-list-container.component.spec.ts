import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersListContainerComponent } from './folders-list-container.component';

describe('FoldersListContainerComponent', () => {
  let component: FoldersListContainerComponent;
  let fixture: ComponentFixture<FoldersListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
