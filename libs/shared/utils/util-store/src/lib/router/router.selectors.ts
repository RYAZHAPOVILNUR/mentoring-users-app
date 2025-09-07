import { getRouterSelectors } from '@ngrx/router-store';

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getRouterSelectors` function
// export const selectRouter = createFeatureSelector<RouterReducerState>('yourFeatureName');

/** select the current route param */
export const selectRouteParam = getRouterSelectors().selectRouteParam;
/** select the current route params */
export const selectRouteParams = getRouterSelectors().selectRouteParams;
/** factory function to select a query param */
export const selectQueryParam = getRouterSelectors().selectQueryParam;
/** select the current route query params */
export const selectQueryParams = getRouterSelectors().selectQueryParams;
