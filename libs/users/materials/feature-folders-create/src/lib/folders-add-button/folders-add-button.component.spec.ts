import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersAddButtonComponent } from './folders-add-button.component';

describe('FoldersAddButtonComponent', () => {
  let component: FoldersAddButtonComponent;
  let fixture: ComponentFixture<FoldersAddButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoldersAddButtonComponent]
    });
    fixture = TestBed.createComponent(FoldersAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
