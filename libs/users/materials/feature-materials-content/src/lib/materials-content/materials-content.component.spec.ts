import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentComponent } from './materials-content.component';

describe('MaterialsContentComponent', () => {
  let component: MaterialsContentComponent;
  let fixture: ComponentFixture<MaterialsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
