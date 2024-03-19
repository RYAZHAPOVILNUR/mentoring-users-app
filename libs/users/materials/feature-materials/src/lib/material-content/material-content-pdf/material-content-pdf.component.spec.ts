import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialContentPdfComponent } from './material-content-pdf.component';

describe('MaterialContentPdfComponent', () => {
  let component: MaterialContentPdfComponent;
  let fixture: ComponentFixture<MaterialContentPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialContentPdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialContentPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
