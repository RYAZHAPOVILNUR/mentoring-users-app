import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFoldersFeatureComponent } from './add-folders-feature.component';

describe('AddFoldersFeatureComponent', () => {
  let component: AddFoldersFeatureComponent;
  let fixture: ComponentFixture<AddFoldersFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFoldersFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFoldersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
