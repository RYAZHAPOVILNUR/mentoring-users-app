import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsCardDeleteDialogComponent } from './materials-card-delete-dialog.component';

describe('MaterialsCardDeleteDialogComponent', () => {
  let component: MaterialsCardDeleteDialogComponent;
  let fixture: ComponentFixture<MaterialsCardDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsCardDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsCardDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
