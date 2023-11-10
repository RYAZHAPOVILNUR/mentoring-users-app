import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsViewComponent } from './materials-view.component';

describe('MaterialsViewComponent', () => {
  let component: MaterialsViewComponent;
  let fixture: ComponentFixture<MaterialsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
