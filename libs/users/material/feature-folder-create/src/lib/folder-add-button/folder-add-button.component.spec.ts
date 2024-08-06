import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderAddButtonComponent } from './folder-add-button.component';

describe('FolderAddButtonComponent', () => {
  let component: FolderAddButtonComponent;
  let fixture: ComponentFixture<FolderAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderAddButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
