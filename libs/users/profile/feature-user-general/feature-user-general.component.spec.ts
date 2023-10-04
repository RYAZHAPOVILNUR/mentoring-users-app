import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureUserGeneralComponent } from './feature-user-general.component';

describe('FeatureUserGeneralComponent', () => {
  let component: FeatureUserGeneralComponent;
  let fixture: ComponentFixture<FeatureUserGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureUserGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureUserGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
