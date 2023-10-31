import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMaterialContentDialogComponent } from './view-material-content-dialog.component';

describe('ViewMaterialContentDialogComponent', () => {
  let component: ViewMaterialContentDialogComponent;
  let fixture: ComponentFixture<ViewMaterialContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMaterialContentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMaterialContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
