import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsCreateComponent } from './feature-materials-create.component';

describe('FeatureMaterialsCreateComponent', () => {
  let component: FeatureMaterialsCreateComponent;
  let fixture: ComponentFixture<FeatureMaterialsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
