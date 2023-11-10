import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsFolderCreateComponent } from './materials-folder-create.component';

describe('MaterialsFolderCreateComponent', () => {
  let component: MaterialsFolderCreateComponent;
  let fixture: ComponentFixture<MaterialsFolderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsFolderCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsFolderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
