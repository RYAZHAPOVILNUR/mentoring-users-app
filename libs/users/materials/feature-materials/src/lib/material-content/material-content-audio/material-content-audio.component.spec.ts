import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialContentAudioComponent } from './material-content-audio.component';

describe('MaterialContentAudioComponent', () => {
  let component: MaterialContentAudioComponent;
  let fixture: ComponentFixture<MaterialContentAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialContentAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialContentAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
