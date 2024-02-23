import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsListContainerComponent } from './materials-list-container.component';

describe('MaterialsListContainerComponent', () => {
  let component: MaterialsListContainerComponent;
  let fixture: ComponentFixture<MaterialsListContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsListContainerComponent]
    });
    fixture = TestBed.createComponent(MaterialsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
