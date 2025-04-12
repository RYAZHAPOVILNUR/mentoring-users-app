import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialsListComponent } from './feature-materials-list.component';

describe('FeatureMaterialsListComponent', () => {
  let component: FeatureMaterialsListComponent;
  let fixture: ComponentFixture<FeatureMaterialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
