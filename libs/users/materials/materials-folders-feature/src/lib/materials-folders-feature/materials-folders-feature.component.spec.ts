import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsFoldersFeatureComponent } from './materials-folders-feature.component';

describe('MaterialsFoldersFeatureComponent', () => {
  let component: MaterialsFoldersFeatureComponent;
  let fixture: ComponentFixture<MaterialsFoldersFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsFoldersFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsFoldersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
