import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFoldersListComponent } from './feature-folders-list.component';

describe('FeatureFoldersListComponent', () => {
  let component: FeatureFoldersListComponent;
  let fixture: ComponentFixture<FeatureFoldersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFoldersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
