import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsAddDialogComponent } from './materials-add-dialog.component';

describe('MaterialsAddDialogComponent', () => {
  let component: MaterialsAddDialogComponent;
  let fixture: ComponentFixture<MaterialsAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsAddDialogComponent]
    });
    fixture = TestBed.createComponent(MaterialsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
