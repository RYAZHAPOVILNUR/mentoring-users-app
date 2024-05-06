import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsCardComponent } from './materials-card.component';

describe('MaterialCardComponent', () => {
  let component: MaterialsCardComponent;
  let fixture: ComponentFixture<MaterialsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
