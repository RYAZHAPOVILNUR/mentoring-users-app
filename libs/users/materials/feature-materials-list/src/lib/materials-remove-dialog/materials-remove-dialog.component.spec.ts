import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsRemoveDialogComponent } from './materials-remove-dialog.component';

describe('MaterialsRemoveDialogComponent', () => {
  let component: MaterialsRemoveDialogComponent;
  let fixture: ComponentFixture<MaterialsRemoveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsRemoveDialogComponent]
    });
    fixture = TestBed.createComponent(MaterialsRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
