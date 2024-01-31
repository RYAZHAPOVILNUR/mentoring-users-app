import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderListContainerComponent } from './folder-list-container.component';

describe('FolderListContainerComponent', () => {
  let component: FolderListContainerComponent;
  let fixture: ComponentFixture<FolderListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
