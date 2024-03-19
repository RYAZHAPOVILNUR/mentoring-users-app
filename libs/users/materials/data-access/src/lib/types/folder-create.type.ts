import { DeepReadonly } from '@users/core/utils';

export type CreateFolder = DeepReadonly<{
  id?: number,
  title: string,
  createdAt?: string,
}>
