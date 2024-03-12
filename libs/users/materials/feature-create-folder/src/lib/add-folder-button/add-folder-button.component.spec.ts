import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFolderButtonComponent } from './add-folder-button.component';

describe('AddFolderButtonComponent', () => {
  let component: AddFolderButtonComponent;
  let fixture: ComponentFixture<AddFolderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFolderButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFolderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
