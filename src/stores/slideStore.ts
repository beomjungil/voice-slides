import { observable, action } from 'mobx';

export class SlideStore {
  @observable
  pageNumber: number = 1;

  @action
  goToNextPage = () => {
    this.pageNumber = this.pageNumber + 1;
  };

  @action
  goToPrevPage = () => {
    this.pageNumber = this.pageNumber - 1;
  };
}

export default new SlideStore();
