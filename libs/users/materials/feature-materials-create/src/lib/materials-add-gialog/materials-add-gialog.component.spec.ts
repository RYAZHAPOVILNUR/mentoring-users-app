import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddGialogComponent } from './materials-add-gialog.component';

describe('MaterialsAddGialogComponent', () => {
  let component: MaterialsAddGialogComponent;
  let fixture: ComponentFixture<MaterialsAddGialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddGialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddGialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
