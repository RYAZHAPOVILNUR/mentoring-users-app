import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFoldersCreateComponent } from './feature-folders-create.component';

describe('FeatureFoldersCreateComponent', () => {
  let component: FeatureFoldersCreateComponent;
  let fixture: ComponentFixture<FeatureFoldersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFoldersCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFoldersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
