import { FoldersEntity } from '../../core/data-access/src';
import { FoldersVm } from './folders-vm';

type FoldersVmAdapter = {
  entityToVm(entity: FoldersEntity): FoldersVm
}

export const foldersVmAdapter: FoldersVmAdapter = {
  entityToVm({ id, title, createdAt }) {
    return { id, title, createdAt };
  }
};
