import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderCreateButtonComponent } from './folder-create-button.component';

describe('FolderCreateButtonComponent', () => {
  let component: FolderCreateButtonComponent;
  let fixture: ComponentFixture<FolderCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderCreateButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
