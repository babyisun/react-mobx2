import {
  observable,
  action,
  runInAction,
} from 'mobx';
import BaseStroe from '@/stores/BaseStore';
import ajax from '@/utils/ajax';
import { loading, toProps } from '@/utils/decorator';
// import {
//   message,
// } from 'antd';

@toProps('twoA')
class TwoA extends BaseStroe {
    // 接口函数统一定义
    api = {
      getList: params => ajax.get('api/demo', {
        params,
      }),
    }

    // 监听store声明
    @observable total = 0;

    @observable data = null;

    @observable twoData = [];

    // 改变store的同步方法
    @action method(params) {
      this.total = params;
      console.log('这是一个同步方法');
    }

    // 避免使用箭头函数，用@action.bound方式声明
    @action forbidMethod = () => {
      this.total = 456;
      console.log('这是方法通过getOwnPropertyNames获取不到');
    }

    // 改变store的异步方法
    @action @loading async add() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(this);
    }

    // 这是一个接口请求示例
    @action.bound @loading async load() {
      const params = { ...{ name: '这是一个示例参数' } };
      const data = await this.api.getList(params);
      console.log(data);
      runInAction(() => {
        if (data.success) {
          this.data = data.data.list;
          this.total = data.total;
        }
      });
    }
}
const store = new TwoA();
export default store;
