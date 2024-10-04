import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersAddDialogComponent } from './folders-add-dialog.component';

describe('FoldersAddDialogComponent', () => {
  let component: FoldersAddDialogComponent;
  let fixture: ComponentFixture<FoldersAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoldersAddDialogComponent]
    });
    fixture = TestBed.createComponent(FoldersAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
