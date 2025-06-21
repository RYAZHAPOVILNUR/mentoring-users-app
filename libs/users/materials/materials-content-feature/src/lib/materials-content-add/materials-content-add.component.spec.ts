import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentAddComponent } from './materials-content-add.component';

describe('MaterialsContentAddComponent', () => {
  let component: MaterialsContentAddComponent;
  let fixture: ComponentFixture<MaterialsContentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
