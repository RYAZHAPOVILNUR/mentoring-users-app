import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersRemoveDialogComponent } from './folders-remove-dialog.component';

describe('FoldersRemoveDialogComponent', () => {
  let component: FoldersRemoveDialogComponent;
  let fixture: ComponentFixture<FoldersRemoveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoldersRemoveDialogComponent]
    });
    fixture = TestBed.createComponent(FoldersRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
