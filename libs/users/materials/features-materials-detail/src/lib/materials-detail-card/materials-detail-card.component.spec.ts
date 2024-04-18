import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsDetailCardComponent } from './materials-detail-card.component';

describe('MaterialsDetailCardComponent', () => {
  let component: MaterialsDetailCardComponent;
  let fixture: ComponentFixture<MaterialsDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
