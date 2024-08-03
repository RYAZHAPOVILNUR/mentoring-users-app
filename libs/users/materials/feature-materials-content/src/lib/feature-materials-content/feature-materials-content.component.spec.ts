import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsContentComponent } from './feature-materials-content.component';

describe('FeatureMaterialsContentComponent', () => {
  let component: FeatureMaterialsContentComponent;
  let fixture: ComponentFixture<FeatureMaterialsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
