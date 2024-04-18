import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsFolderCardComponent } from './materials-folder-card.component';

describe('MaterialsFolderCardComponent', () => {
  let component: MaterialsFolderCardComponent;
  let fixture: ComponentFixture<MaterialsFolderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsFolderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsFolderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
