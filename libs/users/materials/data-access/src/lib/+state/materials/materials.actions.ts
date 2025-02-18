import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    
    
  }
});
