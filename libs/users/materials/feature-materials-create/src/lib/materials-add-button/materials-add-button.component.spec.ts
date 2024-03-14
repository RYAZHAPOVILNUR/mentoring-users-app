import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsAddButtonComponent } from './materials-add-button.component';

describe('MaterialsAddButtonComponent', () => {
  let component: MaterialsAddButtonComponent;
  let fixture: ComponentFixture<MaterialsAddButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsAddButtonComponent]
    });
    fixture = TestBed.createComponent(MaterialsAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
