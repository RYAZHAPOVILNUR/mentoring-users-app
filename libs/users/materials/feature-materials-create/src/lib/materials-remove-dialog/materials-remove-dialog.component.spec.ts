import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsRemoveDialogComponent } from './materials-remove-dialog.component';

describe('MaterialsAddDialogComponent', () => {
  let component: MaterialsRemoveDialogComponent;
  let fixture: ComponentFixture<MaterialsRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsRemoveDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
