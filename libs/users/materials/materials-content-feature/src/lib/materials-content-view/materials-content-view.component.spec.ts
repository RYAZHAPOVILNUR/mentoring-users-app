import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentViewComponent } from './materials-content-view.component';

describe('MaterialsContentViewComponent', () => {
  let component: MaterialsContentViewComponent;
  let fixture: ComponentFixture<MaterialsContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
