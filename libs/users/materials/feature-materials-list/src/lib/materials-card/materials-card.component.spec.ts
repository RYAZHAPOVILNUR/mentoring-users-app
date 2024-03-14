import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsCardComponent } from './materials-card.component';

describe('MaterialsCardComponent', () => {
  let component: MaterialsCardComponent;
  let fixture: ComponentFixture<MaterialsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsCardComponent]
    });
    fixture = TestBed.createComponent(MaterialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
