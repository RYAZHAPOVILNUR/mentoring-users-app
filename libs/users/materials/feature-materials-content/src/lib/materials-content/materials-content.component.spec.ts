import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsContentComponent } from './materials-content.component';

describe('MaterialsContentComponent', () => {
  let component: MaterialsContentComponent;
  let fixture: ComponentFixture<MaterialsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsContentComponent]
    });
    fixture = TestBed.createComponent(MaterialsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
