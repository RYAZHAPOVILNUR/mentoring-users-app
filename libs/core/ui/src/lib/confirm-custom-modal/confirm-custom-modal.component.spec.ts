import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmCustomModalComponent } from './confirm-custom-modal.component';

describe('DeleteFolderModalComponent', () => {
  let component: ConfirmCustomModalComponent;
  let fixture: ComponentFixture<ConfirmCustomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCustomModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
