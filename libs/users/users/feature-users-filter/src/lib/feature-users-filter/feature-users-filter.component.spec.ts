import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureUsersFilterComponent } from './feature-users-filter.component';

describe('FeatureUsersFilterComponent', () => {
  let component: FeatureUsersFilterComponent;
  let fixture: ComponentFixture<FeatureUsersFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureUsersFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureUsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
