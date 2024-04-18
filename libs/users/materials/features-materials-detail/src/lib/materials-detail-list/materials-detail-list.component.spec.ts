import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDetailListComponent } from './materials-detail-list.component';

describe('MaterialsDetailListComponent', () => {
  let component: MaterialsDetailListComponent;
  let fixture: ComponentFixture<MaterialsDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDetailListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
