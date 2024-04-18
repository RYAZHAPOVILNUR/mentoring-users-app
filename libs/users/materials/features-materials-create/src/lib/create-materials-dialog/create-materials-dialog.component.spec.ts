import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMaterialsDialogComponent } from './create-materials-dialog.component';

describe('CreateMaterialsDialogComponent', () => {
  let component: CreateMaterialsDialogComponent;
  let fixture: ComponentFixture<CreateMaterialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMaterialsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMaterialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
