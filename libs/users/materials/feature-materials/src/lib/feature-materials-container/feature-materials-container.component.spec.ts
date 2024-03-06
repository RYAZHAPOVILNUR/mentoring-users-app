import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsContainerComponent } from './feature-materials-container.component';

describe('FeatureMaterialsContainerComponent', () => {
  let component: FeatureMaterialsContainerComponent;
  let fixture: ComponentFixture<FeatureMaterialsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
