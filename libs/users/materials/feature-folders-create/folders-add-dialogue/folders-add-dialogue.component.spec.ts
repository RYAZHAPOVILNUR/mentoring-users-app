import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersAddDialogueComponent } from './folders-add-dialogue.component';

describe('FoldersAddDialogueComponent', () => {
  let component: FoldersAddDialogueComponent;
  let fixture: ComponentFixture<FoldersAddDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersAddDialogueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersAddDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
