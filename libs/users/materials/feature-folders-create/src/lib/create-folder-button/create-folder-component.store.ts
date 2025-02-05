import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface CreateFolderComponentState {};

const initialState: CreateFolderComponentState = {};

@Injectable()
export class CreateFolderComponentStore extends ComponentStore<CreateFolderComponentState> {
  constructor() {
    super(initialState);
  }
}
