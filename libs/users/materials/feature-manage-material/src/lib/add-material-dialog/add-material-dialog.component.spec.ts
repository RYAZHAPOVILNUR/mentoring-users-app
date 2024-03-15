import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMaterialDialogComponent } from './add-material-dialog.component';

describe('AddMaterialDialogComponent', () => {
  let component: AddMaterialDialogComponent;
  let fixture: ComponentFixture<AddMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterialDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
