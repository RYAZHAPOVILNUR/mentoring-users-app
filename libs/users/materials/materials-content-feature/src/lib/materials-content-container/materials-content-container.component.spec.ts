import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentContainerComponent } from './materials-content-container.component';

describe('MaterialsContentContainerComponent', () => {
  let component: MaterialsContentContainerComponent;
  let fixture: ComponentFixture<MaterialsContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
