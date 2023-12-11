import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFolderListComponent } from './feature-folder-list.component';

describe('FeatureFolderListComponent', () => {
  let component: FeatureFolderListComponent;
  let fixture: ComponentFixture<FeatureFolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFolderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
