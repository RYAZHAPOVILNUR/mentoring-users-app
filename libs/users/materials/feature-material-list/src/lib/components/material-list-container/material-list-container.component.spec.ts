import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureMaterialListComponent } from './material-list-container.component';

describe('FeatureMaterialListComponent', () => {
  let component: FeatureMaterialListComponent;
  let fixture: ComponentFixture<FeatureMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureMaterialListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
