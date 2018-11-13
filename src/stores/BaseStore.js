import {
  observable,
  configure,
  action,
  runInAction,
  // extendObservable,
} from 'mobx';
// import moment from 'moment';
import ajax from '@/utils/ajax';
// import { loading } from '@/utils/decorator';
import { asyncAction } from './B';

configure({
  enforceActions: 'always',
});
export default class BaseStroe {
  constructor() {
    this.init();
  }

  init() {
    this.loading && this.loading.forEach(item => {
      asyncAction(this, item);
    });
  }

    @observable version = '';

    @observable user = null;

    @observable getUserLoading=false;

    @action.bound async getUser() {
      this.getUserLoading = true;
      const data = await ajax.get('/sfanalyzer/user/checklogin');
      if (data && data.success && data.data) {
        runInAction(() => {
          this.user = data.data;
          this.getUserLoading = false;
        });
      }
    }

    render() {
      this.version = +new Date();
    }
}
