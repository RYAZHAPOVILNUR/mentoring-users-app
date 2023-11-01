import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMaterialDialogComponentComponent } from './add-material-dialog-component.component';

describe('AddMaterialDialogComponentComponent', () => {
  let component: AddMaterialDialogComponentComponent;
  let fixture: ComponentFixture<AddMaterialDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaterialDialogComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMaterialDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
