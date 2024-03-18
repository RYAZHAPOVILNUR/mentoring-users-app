import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialContentComponent } from './material-content.component';

describe('MaterialContentComponent', () => {
  let component: MaterialContentComponent;
  let fixture: ComponentFixture<MaterialContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
