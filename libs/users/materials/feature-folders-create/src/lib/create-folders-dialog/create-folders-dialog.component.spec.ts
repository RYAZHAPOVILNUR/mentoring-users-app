import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFoldersDialogComponent } from './create-folders-dialog.component';

describe('CreateFoldersDialogComponent', () => {
  let component: CreateFoldersDialogComponent;
  let fixture: ComponentFixture<CreateFoldersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFoldersDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFoldersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
