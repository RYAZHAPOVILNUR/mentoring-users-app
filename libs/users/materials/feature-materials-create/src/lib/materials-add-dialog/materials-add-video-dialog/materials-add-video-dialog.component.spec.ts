import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddVideoDialogComponent } from './materials-add-video-dialog.component';

describe('MaterialsAddVideoDialogComponent', () => {
  let component: MaterialsAddVideoDialogComponent;
  let fixture: ComponentFixture<MaterialsAddVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddVideoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
