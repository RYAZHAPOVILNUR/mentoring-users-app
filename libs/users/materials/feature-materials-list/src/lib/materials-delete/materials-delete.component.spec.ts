import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDeleteComponent } from './materials-delete.component';

describe('MaterialsDeleteComponent', () => {
  let component: MaterialsDeleteComponent;
  let fixture: ComponentFixture<MaterialsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
