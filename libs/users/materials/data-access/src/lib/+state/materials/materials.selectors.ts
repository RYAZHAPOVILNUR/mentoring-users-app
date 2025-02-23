import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

// Создаёт селектор, который получает всё состояние MaterialsState из глобального хранилища NgRx.
export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);
// selectAll — функция, возвращающая массив всех сущностей (материалов).
// selectEntities — функция, возвращающая объект { [id]: entity }, где ключи — id материалов, а значения — сами материалы.
const { selectAll, selectEntities } = materialsAdapter.getSelectors();

// createSelector создаёт селектор, который получает status из MaterialsState.
export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

// Получает errors из MaterialsState. Используется для обработки ошибок загрузки данных.
export const selectmaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.errors);

// Извлекает все материалы из состояния с помощью selectAll. Если state отсутствует, возвращает пустой массив [].
export const selectAllMaterials = createSelector(selectMaterialsState, (state) =>
  state ? materialsAdapter.getSelectors().selectAll(state) : []
);

// Получает текущий фильтр из MaterialsState. Используется для фильтрации списка материалов.
export const selectMaterialsFilter = createSelector(selectMaterialsState, (state: MaterialsState | undefined) =>
  state ? state.materialsFilter : { title: '' }
);

// selectAllMaterials → получает все материалы. selectMaterialsFilter → получает текущий фильтр.
// Возвращает отфильтрованный список материалов, содержащих текст filter.title.
export const selectFiltredMaterials = createSelector(selectAllMaterials, selectMaterialsFilter, (materials, filter) => {
  return materials.filter((material) => material.title.toLowerCase().includes(filter.title.toLowerCase()));
});

// Эта функция просто выбрасывает ошибку, потому что не реализована. Вероятно, она планировалась для выбора материала по id
export function selectMaterialsById(id: number): any {
  throw new Error('Function not implemented.');
}
//
// selectEntities(state) возвращает объект с материалами в формате { [id]: material }. Упрощает доступ к конкретному материалу по id.
export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) =>
  selectEntities(state)
);

// Фабричный селектор, принимающий id. Возвращает селектор, который ищет материал в entities.
export const selectMaterialById = (id: number) => createSelector(selectMaterialsEntities, (entities) => entities[id]);

//selectRouteParams получает параметры из URL (например, id материала). selectMaterialsEntities получает объект { [id]: material }.
// Возвращает открытый материал, если id найден, иначе null. Используется, например, на странице /materials/:id.
export const selectOpenedMaterial = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({ id }, entities) => entities[id] || null
);
