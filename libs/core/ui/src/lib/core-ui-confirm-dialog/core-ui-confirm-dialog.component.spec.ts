import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreUiConfirmDialogComponent } from './core-ui-confirm-dialog.component';

describe('CoreUiConfirmDialogComponent', () => {
  let component: CoreUiConfirmDialogComponent;
  let fixture: ComponentFixture<CoreUiConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreUiConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreUiConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
