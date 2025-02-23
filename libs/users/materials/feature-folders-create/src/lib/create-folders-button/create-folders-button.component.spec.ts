import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFoldersButtonComponent } from './create-folders-button.component';

describe('CreateFoldersButtonComponent', () => {
  let component: CreateFoldersButtonComponent;
  let fixture: ComponentFixture<CreateFoldersButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFoldersButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFoldersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
