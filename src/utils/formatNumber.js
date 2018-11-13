/* eslint-disable no-bitwise */
/**
 * 格式化价格
 * @param {number} num 数字
 * @return {string} 汉字单位字符串
 */
const formatNumber = (num) => {
  if (num > 9999999999999) return num;// 大于9999亿的时候不再处理
  let number = '';
  let tempw = num;
  let tempq = num;
  if (num >= 100000000) {
    number += `${~~(num / 100000000)}亿`;
    tempw = +(num / 10000);
  }
  if (tempw >= 10000) {
    number += `${~~(tempw / 10000)}万零`;
    tempq = ~~(tempw / 10000);
  }
  number += tempq;
  return number;
};

export default formatNumber;
