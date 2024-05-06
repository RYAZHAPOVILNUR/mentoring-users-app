import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFolderButtonComponent } from '@users/feature-folder-create';

describe('CreateFolderButtonComponent', () => {
  let component: CreateFolderButtonComponent;
  let fixture: ComponentFixture<CreateFolderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFolderButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFolderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
