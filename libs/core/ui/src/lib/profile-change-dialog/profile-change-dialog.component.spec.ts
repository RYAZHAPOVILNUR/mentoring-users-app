import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangeDialogComponent } from './profile-change-dialog.component';

describe('ProfileChangeDialogComponent', () => {
  let component: ProfileChangeDialogComponent;
  let fixture: ComponentFixture<ProfileChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileChangeDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
