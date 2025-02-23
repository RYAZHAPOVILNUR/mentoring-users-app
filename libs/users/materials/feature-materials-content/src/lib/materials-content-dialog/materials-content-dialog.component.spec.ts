import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsContentDialogComponent } from './materials-content-dialog.component';

describe('MaterialsContentDialogComponent', () => {
  let component: MaterialsContentDialogComponent;
  let fixture: ComponentFixture<MaterialsContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsContentDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
