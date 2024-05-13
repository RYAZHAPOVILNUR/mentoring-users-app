import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsCreateDialogComponent } from './materials-create-dialog.component';

describe('MaterialsCreateDialogComponent', () => {
  let component: MaterialsCreateDialogComponent;
  let fixture: ComponentFixture<MaterialsCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsCreateDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
