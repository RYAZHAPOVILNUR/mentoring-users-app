import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersListComponent } from './folders-list.component';

describe('FolderListComponent', () => {
  let component: FoldersListComponent;
  let fixture: ComponentFixture<FoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
