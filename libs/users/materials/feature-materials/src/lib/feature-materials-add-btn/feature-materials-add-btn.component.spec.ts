import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsAddBtnComponent } from './feature-materials-add-btn.component';

describe('FeatureMaterialsAddBtnComponent', () => {
  let component: FeatureMaterialsAddBtnComponent;
  let fixture: ComponentFixture<FeatureMaterialsAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsAddBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
