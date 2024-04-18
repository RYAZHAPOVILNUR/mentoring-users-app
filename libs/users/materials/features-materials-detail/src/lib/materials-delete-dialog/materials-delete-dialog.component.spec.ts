import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDeleteDialogComponent } from './materials-delete-dialog.component';

describe('MaterialsDeleteDialogComponent', () => {
  let component: MaterialsDeleteDialogComponent;
  let fixture: ComponentFixture<MaterialsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDeleteDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
