import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersFeatureContainerComponent } from './folders-feature-container.component';

describe('FoldersFeatureContainerComponent', () => {
  let component: FoldersFeatureContainerComponent;
  let fixture: ComponentFixture<FoldersFeatureContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersFeatureContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersFeatureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
