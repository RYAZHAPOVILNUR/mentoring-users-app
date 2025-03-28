import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddDialogueComponent } from './materials-add-dialogue.component';

describe('MaterialsAddDialogueComponent', () => {
  let component: MaterialsAddDialogueComponent;
  let fixture: ComponentFixture<MaterialsAddDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddDialogueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
