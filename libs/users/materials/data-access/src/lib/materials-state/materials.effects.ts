import {  inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as MaterialsActions from './materials.actions';

import {ApiService} from '@users/core/http';
import {MaterialsEntity} from './materials.models';
import { map } from 'rxjs/operators';
import { MaterialsService } from '../services/materials.service';
import { CreateMaterialDTO } from '../models/materials-dto.models';

export const initMaterials = createEffect(()=>{

  const httpService = inject(ApiService);
  const actions$ = inject(Actions);
  const materialsService= inject(MaterialsService);

  return actions$.pipe(
    ofType(MaterialsActions.initMaterials),
    switchMap(()=>
      httpService.get<MaterialsEntity[]>('/material').pipe(
        map((materials)=>
        materials.map(material =>{
          return {
          ...material,
          type : materialsService.determineMaterialType(material.material_link)
        }
        })
        ),
        map((processedMaterials)=>MaterialsActions.loadMaterialsSuccess({materials: processedMaterials})),
        catchError((error)=> {
          console.error('Error', error)
          return of(MaterialsActions.loadMaterialsFailure({error}))
        })
      ))
  )
}, {functional: true})

export const addMaterial = createEffect(()=>{

  const httpService = inject(ApiService);
  const actions$ = inject(Actions);
  const materialsService= inject(MaterialsService);

  return actions$.pipe(
    ofType(MaterialsActions.addMaterial),
    switchMap(({material})=>
    httpService.post<MaterialsEntity, CreateMaterialDTO >(`/material`, material).pipe(
      map((material)=> MaterialsActions.addMaterialSuccess({material: {...material, type: materialsService.determineMaterialType(material.material_link)}})),
      catchError((error)=>{
        return of(MaterialsActions.addMaterialFailure({error}))
      })
    ))
  )
  },
  {functional: true})

export const deleteMaterial = createEffect(()=>{
  const httpService = inject(ApiService)
  const actions$ = inject(Actions)

  return actions$.pipe(
    ofType(MaterialsActions.deleteMaterial),
    switchMap(({id})=>
      httpService.delete(`/material/${id}`).pipe(
        map(()=> MaterialsActions.deleteMaterialSuccess({id})),
        catchError((error)=>{
          return of(MaterialsActions.deleteMaterialFailure({error}))
        })
      )
    )
  )
  },
  {functional: true}

)
