import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialFolderContainerComponent } from './material-folder-container.component';

describe('MaterialFolderContainerComponent', () => {
  let component: MaterialFolderContainerComponent;
  let fixture: ComponentFixture<MaterialFolderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialFolderContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialFolderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
