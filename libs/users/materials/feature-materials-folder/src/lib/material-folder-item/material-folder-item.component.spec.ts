import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialFolderItemComponent } from './material-folder-item.component';

describe('MaterialFolderItemComponent', () => {
  let component: MaterialFolderItemComponent;
  let fixture: ComponentFixture<MaterialFolderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialFolderItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialFolderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
