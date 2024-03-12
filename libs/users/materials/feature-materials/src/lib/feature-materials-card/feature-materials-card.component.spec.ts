import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsCardComponent } from './feature-materials-card.component';

describe('FeatureMaterialsCardComponent', () => {
  let component: FeatureMaterialsCardComponent;
  let fixture: ComponentFixture<FeatureMaterialsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
