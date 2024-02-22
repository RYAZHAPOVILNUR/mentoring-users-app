import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialFolderAddBtnComponent } from './material-folder-add-btn.component';

describe('MaterialFolderAddBtnComponent', () => {
  let component: MaterialFolderAddBtnComponent;
  let fixture: ComponentFixture<MaterialFolderAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialFolderAddBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialFolderAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
