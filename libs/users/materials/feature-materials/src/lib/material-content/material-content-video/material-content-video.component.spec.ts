import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialContentVideoComponent } from './material-content-video.component';

describe('MaterialContentVideoComponent', () => {
  let component: MaterialContentVideoComponent;
  let fixture: ComponentFixture<MaterialContentVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialContentVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialContentVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
