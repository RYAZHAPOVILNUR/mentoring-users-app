import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialContentComponent } from './material-content-modal.component';

describe('FeatureMaterialContentComponent', () => {
  let component: FeatureMaterialContentComponent;
  let fixture: ComponentFixture<FeatureMaterialContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
