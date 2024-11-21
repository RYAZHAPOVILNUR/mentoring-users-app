import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaterialsButtonComponent } from './create-materials-button.component';

describe('CreateMaterialsButtonComponent', () => {
  let component: CreateMaterialsButtonComponent;
  let fixture: ComponentFixture<CreateMaterialsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateMaterialsButtonComponent]
    });
    fixture = TestBed.createComponent(CreateMaterialsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
