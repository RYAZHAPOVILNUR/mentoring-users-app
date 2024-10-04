import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersListComponent } from './folders-list.component';

describe('FoldersListComponent', () => {
  let component: FoldersListComponent;
  let fixture: ComponentFixture<FoldersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoldersListComponent]
    });
    fixture = TestBed.createComponent(FoldersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
