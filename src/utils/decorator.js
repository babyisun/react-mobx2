export const readonly = (target, name, descriptor) => {
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
};

export const log = (target, name, descriptor) => {
  const oldValue = descriptor.value;
  descriptor.value = () => {
    // eslint-disable-next-line no-undef
    console.log(`Calling ${name} with`, arguments);
    // eslint-disable-next-line no-undef
    return oldValue.apply(this, arguments);
  };
  return descriptor;
};

// 自动生成以action名为标量的loading监听对象，如name为getList，则可用标量为getListLoading
export const loading = (target, name, descriptor) => {
  if (!target.loading) target.loading = [];
  target.loading.push(name);
  return descriptor;
};

// 把store对象注入到页面中的props
export const toProps = (name) => (target) => {
  target['__props'] = name;
};
