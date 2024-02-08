import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderModalComponent } from './add-folder-modal.component';

describe('AddFolderModalComponent', () => {
  let component: AddFolderModalComponent;
  let fixture: ComponentFixture<AddFolderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddFolderModalComponent]
    });
    fixture = TestBed.createComponent(AddFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
