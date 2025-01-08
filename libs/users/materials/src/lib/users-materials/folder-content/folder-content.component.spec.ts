import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FolderContentComponent } from './folder-content.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { IFolder } from '@users/materials/data-access';

describe('FolderContentComponent', () => {
  let component: FolderContentComponent;
  let fixture: ComponentFixture<FolderContentComponent>;
  let materialsFacade: { loadFolders: jasmine.Spy };

  const mockFolder: IFolder = {
    id: '1',
    name: 'Test Folder',
    title: 'Test Folder Title'
  };

  beforeEach(async () => {
    materialsFacade = { loadFolders: jasmine.createSpy('loadFolders') };

    await TestBed.configureTestingModule({
      imports: [
        FolderContentComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MaterialsFacade, useValue: materialsFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderContentComponent);
    component = fixture.componentInstance;
    component.folder = mockFolder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display folder title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain(mockFolder.title);
  });

  it('should display folder name if title is not available', () => {
    const folderWithoutTitle: IFolder = {
      id: '1',
      name: 'Test Folder',
      title: undefined
    };
    component.folder = folderWithoutTitle;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain(folderWithoutTitle.name);
  });

  it('should have back button', () => {
    const backButton = fixture.nativeElement.querySelector('button[mat-icon-button]');
    expect(backButton).toBeTruthy();
    expect(backButton.querySelector('mat-icon').textContent).toContain('arrow_back');
  });

  it('should call onBack when back button is clicked', () => {
    spyOn(component, 'onBack');
    const backButton = fixture.nativeElement.querySelector('button[mat-icon-button]');
    backButton.click();
    expect(component.onBack).toHaveBeenCalled();
  });

  it('should emit backClick event when back button is clicked', () => {
    spyOn(component.backClick, 'emit');
    const backButton = fixture.nativeElement.querySelector('button[mat-icon-button]');
    backButton.click();
    expect(component.backClick.emit).toHaveBeenCalled();
  });
}); 