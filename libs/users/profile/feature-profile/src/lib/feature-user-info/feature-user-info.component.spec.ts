import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureUserInfoComponent } from './feature-user-info.component';

describe('FeatureUserInfoComponent', () => {
  let component: FeatureUserInfoComponent;
  let fixture: ComponentFixture<FeatureUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureUserInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
