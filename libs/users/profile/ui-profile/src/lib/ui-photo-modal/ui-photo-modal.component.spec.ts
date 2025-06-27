import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPhotoModalComponent } from './ui-photo-modal.component';

describe('UiPhotoModalComponent', () => {
  let component: UiPhotoModalComponent;
  let fixture: ComponentFixture<UiPhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPhotoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
