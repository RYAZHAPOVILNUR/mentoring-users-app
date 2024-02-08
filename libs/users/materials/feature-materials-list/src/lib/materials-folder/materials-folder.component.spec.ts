import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsFolderComponent } from './materials-folder.component';

describe('MaterialsFolderComponent', () => {
  let component: MaterialsFolderComponent;
  let fixture: ComponentFixture<MaterialsFolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsFolderComponent]
    });
    fixture = TestBed.createComponent(MaterialsFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
