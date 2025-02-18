import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersListContainerComponent } from './folders-list-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('FoldersListContainerComponent', () => {
  let component: FoldersListContainerComponent;
  let fixture: ComponentFixture<FoldersListContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ FoldersListContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersListContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
