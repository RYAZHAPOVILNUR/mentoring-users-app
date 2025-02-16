import { FoldersListContainerStore } from './folders-list-container.store';

describe('FoldersListContainerStore', () => {
  const componentStore = new FoldersListContainerStore();

  it('should be created', () => {
    expect(componentStore).toBeTruthy();
  });
});
