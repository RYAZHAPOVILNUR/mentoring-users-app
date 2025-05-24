import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentFeatureComponent } from './materials-content-feature.component';

describe('MaterialsContentFeatureComponent', () => {
  let component: MaterialsContentFeatureComponent;
  let fixture: ComponentFixture<MaterialsContentFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
