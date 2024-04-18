import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDetailDialogComponent } from './materials-detail-dialog.component';

describe('MaterialsDetailDialogComponent', () => {
  let component: MaterialsDetailDialogComponent;
  let fixture: ComponentFixture<MaterialsDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDetailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
