import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import * as MaterialsFeature from './materials.reducer';


