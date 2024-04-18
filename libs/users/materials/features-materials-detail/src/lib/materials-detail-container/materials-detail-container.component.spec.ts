import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDetailContainerComponent } from './materials-detail-container.component';

describe('MaterialsDetailContainerComponent', () => {
  let component: MaterialsDetailContainerComponent;
  let fixture: ComponentFixture<MaterialsDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDetailContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
