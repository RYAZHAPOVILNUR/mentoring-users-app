import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsListComponent } from './materials-list.component';

describe('MaterialsListComponent', () => {
  let component: MaterialsListComponent;
  let fixture: ComponentFixture<MaterialsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsListComponent]
    });
    fixture = TestBed.createComponent(MaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
