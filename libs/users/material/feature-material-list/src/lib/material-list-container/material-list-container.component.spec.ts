import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialListContainerComponent } from './material-list-container.component';

describe('MaterialListContainerComponent', () => {
  let component: MaterialListContainerComponent;
  let fixture: ComponentFixture<MaterialListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
